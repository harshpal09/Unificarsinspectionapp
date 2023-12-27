import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  
} from 'react-native';
import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';
import { THEME_COLOR, globalStyles, height, width } from '../utils/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import TimerComponent from './TimerComponent';
import RNFS from 'react-native-fs';



const VideoComponent = ({ onVideoCapture, videoArray, fields,deletePhoto }) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  const cameraRef = useRef(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [capturedVideos, setCapturedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isRareCamera, setIsRareCamera] = useState(true);
  const [showCapturedVideos, setShowCapturedVideos] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  

  const device = useCameraDevice(isRareCamera ? 'back' : 'front');


  useEffect(()=>{
    if(fields.value.length > 0){
      videoArray("",fields)
    }
  },[])
//   const device = useCameraDevice('back'); // You can modify this as needed

//   console.log("sdfghjkhgf =>",capturedVideos)

const requestCameraAndMicrophonePermission = async () => {
  const microphonePermission = Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  });

  const cameraPermission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });

  try {
    // Request microphone permission
    const microphonePermissionStatus = await check(microphonePermission);
    if (microphonePermissionStatus !== RESULTS.GRANTED) {
      const microphoneResult = await request(microphonePermission);
      if (microphoneResult !== RESULTS.GRANTED) {
        console.log('Microphone permission denied');
        // Handle denial as needed
        return;
      }
    }

    // Request camera permission
    const cameraPermissionStatus = await check(cameraPermission);
    if (cameraPermissionStatus !== RESULTS.GRANTED) {
      const cameraResult = await request(cameraPermission);
      if (cameraResult !== RESULTS.GRANTED) {
        console.log('Camera permission denied');
        // Handle denial as needed
        return;
      }
    }

    console.log('Microphone and camera permissions granted');
  } catch (err) {
    console.warn(err);
  }
};


  useEffect(() => {
    requestCameraAndMicrophonePermission();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Camera permission is required</Text>
        <TouchableOpacity style={[{backgroundColor:THEME_COLOR,color:'white' ,width:'100%',borderRadius:10,padding:10},globalStyles.flexBox]} onPress={requestPermission}>
          <Text style={{color:'white'}}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No camera device available</Text>
      </View>
    );
  }

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    if(isRecording){
      handleStopRecording();
    }
    setIsCameraOpen(false);
    setSelectedVideo(null);
  };

  const handleStartRecording = async () => {
    try {
      const recordingOptions = {
        onRecordingFinished: (video) => {
        //   console.log('Video recorded:', video);
          setCapturedVideos((prevVideos) => [...prevVideos, video]);
            setShowCapturedVideos(true);
             fetchVideoAndConvertToBase64(video.path)
          
        },
        onRecordingError: (error) => {
          console.error('Error recording video:', error);
          setIsRecording(false);
        },
      };

      await cameraRef.current.startRecording(recordingOptions);
      setShowTimer(true);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  async function fetchVideoAndConvertToBase64(videoUrl) {
    try {
      const videoData = await RNFS.readFile(videoUrl, 'base64');

      videoArray(videoData,fields);

      // return videoData;
    } catch (error) {
      console.error('Error reading video file:', error);
      throw error;
    }
  }
  const convertToBase64 = async(videoUrl) =>{
    try {
      const videoData = await RNFS.readFile(videoUrl, 'base64');

      

      return videoData;
    } catch (error) {
      console.error('Error reading video file:', error);
      throw error;
    }
  }
  // console.log("show time => ",showTimer," isRecording =>",isRecording);
  // async function fetchVideoAndConvertToBase64(videoUrl) {
  //   try {
  //     const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
  
  //     if (response.status === 200) {
  //       const base64 = Buffer.from(response.data, 'binary').toString('base64');
  //       console.log("base64 =>",base64)
  //       return base64;
  //     } else {
  //       console.error('Failed to fetch video:', response.status, response.statusText);
  //       throw new Error('Failed to fetch video');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching video:', error.message);
  //     throw error;
  //   }
  // }
  // console.log("is recording =>",isRecording)
  
//   // Example usage
//   const videoPath = 'file:///path/to/your/video.mp4';
//   videoToBase64(videoPath);
  
  console.log("set capture videos => ",capturedVideos);
  const handleStopRecording = async () => {
    try {
      await cameraRef.current.stopRecording();
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
    finally{
        setIsRecording(false);
        setShowTimer(false);
    }
  };

  const handleExitRecording = () => {
    handleCloseCamera();
  };

  const handleVideoClick = (index) => {
    console.log("sdfghjk=> ",index)
    if(capturedVideos.length > 0){
      setIsCameraOpen(false);
        // console.log("if=> ",index)
        setSelectedVideo(capturedVideos[index]);
      }
      else{
        // console.log("fields value => ",fields.value[index])
        setSelectedVideo(fields.value[index]);
      }  };

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[
          styles.openCameraButton,
          globalStyles.rowContainer,
          globalStyles.flexBoxAlign,
        ]}
        onPress={handleOpenCamera}>
        <Text style={styles.openCameraButtonText}>Start Recording</Text>
        <MaterialCommunityIcons name={'video'} color="white" size={25} />
      </TouchableOpacity>



      {((capturedVideos.length > 0 && showCapturedVideos) ||
        (fields.value.length > 0 && !showCapturedVideos)) && (
        <View style={{ marginTop: 10, width: '90%' }}>
          <FlatList
            data={
                showCapturedVideos
                ? capturedVideos
                : fields.value.length > 0
                ? fields.value
                : []
            }
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity style={{backgroundColor:'black'}} onPress={() =>{handleVideoClick(index)}}>
                <Video
                  source={{ 
                    uri: showCapturedVideos
                    ? `file://${item.path}`
                    : item,
                }}
                  style={{ width: 100, height: 100, marginHorizontal: 2 }}
                  key={index}
                />
                <TouchableOpacity
                  onPress={async() => {
                    const base64 = await convertToBase64(item.path);
                    deletePhoto(base64,fields);
                    let arr = capturedVideos.filter((_, ind) => ind !== index);
                    setCapturedVideos(arr);
                    if (capturedVideos.length == 1) {
                      setSelectedVideo(null);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    backgroundColor: 'white',
                  }}>
                  <MaterialCommunityIcons
                    name={'trash-can'}
                    size={20}
                    color="red"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />

        </View>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={isCameraOpen}>

        {/* {selectedVideo && (
          <SafeAreaView style={styles.modalContainer}>
            <Text>Selected Video:</Text>
            <TouchableOpacity style={[styles.button]} onPress={() => setSelectedVideo(null)}>
            <Text>Close Video</Text>
            </TouchableOpacity>
            
            <Video source={{ uri: `file://${selectedVideo.path}`}} style={{flex:1,height:height,width:width}}  />
            
          </SafeAreaView>
        )} */}

        {!selectedVideo && (
          <View style={styles.modalContainer}>
            <Camera
              style={styles.camera}
              device={device}
              isActive={true}
              ref={cameraRef}
              video={true}
              audio={true}
              onInitialized={() => {
                // Initialization logic
              }}
              onError={(error) => {
                console.error('Camera error:', error);
              }}
            />
            <TouchableOpacity
            style={styles.closeCameraButton}
            onPress={handleCloseCamera}>
            <MaterialCommunityIcons
              name={'camera-off'}
              size={40}
              color={'white'}
            />
          </TouchableOpacity>
          {showTimer && <TimerComponent isRecording={isRecording} onClose={handleStopRecording} />}

            <View
              style={[
                {
                  width: '100%',
                  height: 120,
                  backgroundColor: 'black',
                  position: 'absolute',
                  bottom: 0,
                  justifyContent: 'space-around',
                },
                globalStyles.rowContainer,
                globalStyles.flexBoxAlign,
              ]}>
              <View style={[{ width: '33%' }, globalStyles.flexBox]}>
                <View style={styles.capturedVideosContainer}>
                  {/* {capturedVideos.map((video, index) => ( */}
                    <TouchableOpacity
                    //   key={index}
                      onPress={() => handleVideoClick(capturedVideos.length-1)}>
                        {
                        capturedVideos.length > 0 ?
                      <Video
                        source={{ uri: `file://${capturedVideos[capturedVideos.length-1].path}` }}
                        style={styles.capturedVideo}
                      />:<></>}
                    </TouchableOpacity>
                  {/* ))} */}
                </View>
              </View>

              <View style={[{ width: '33%' }, globalStyles.flexBox]}>
                <View style={[styles.captureButton, globalStyles.flexBox]}>
                  {!isRecording ? (
                    <TouchableOpacity
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'white',
                          borderRadius: 40,
                        },
                      ]}
                      onPress={handleStartRecording}>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'red',
                          borderRadius: 40,
                        },
                      ]}
                      onPress={handleStopRecording}>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={[{ width: '33%' }, globalStyles.flexBox]}>
                {/* <TouchableOpacity onPress={handleExitRecording}>
                  <Text style={styles.exitButtonText}>Exit</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => setIsRareCamera(!isRareCamera)}>
                <MaterialCommunityIcons
                  name={'camera-flip'}
                  size={40}
                  color={'white'}
                />
              </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
      {selectedVideo && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedVideo != null}>
          <FlatList
            data={showCapturedVideos
                ? capturedVideos.reverse()
                : fields.value.length > 0
                ? fields.value
                : []}
            horizontal
            pagingEnabled
            renderItem={({item, index}) => (
              <View style={styles.modalContainer}>
                <Video
                  source={{uri:showCapturedVideos ? `file://${item.path}` : item}}
                  style={{width: width, height: height}}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeCameraButton}
                  onPress={() => setSelectedVideo(null)}>
                  <MaterialCommunityIcons
                    size={45}
                    color={'black'}
                    name={'close-box'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteImageButton}
                  onPress={async() => {
                    const base64 = await convertToBase64(item.path);
                    deletePhoto(base64,fields);
                    let arr = capturedVideos.filter((_, ind) => ind !== index);
                    setCapturedVideos(arr);
                    if (capturedVideos.length == 1) {
                      setSelectedVideo(null);
                    }
                  }}>
                  <MaterialCommunityIcons
                    size={45}
                    color={'black'}
                    name={'trash-can'}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        
        </Modal>
      )} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginVertical: 3,
  },
  openCameraButton: {
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  openCameraButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
  },
  camera: {
    ...StyleSheet.absoluteFill,
  },
  closeCameraButton: {
    position: 'absolute',
    top: 70,
    right: 0,
    // backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteImageButton: {
    position: 'absolute',
    top: 70,
    left: 0,
    padding: 10,
    borderRadius: 5,
  },
  captureButton: {
    alignSelf: 'center',
    padding: 3,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    width: 80,
    height: 80,
  },
  captureButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  exitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  capturedVideosContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  capturedVideo: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
  },
  button:{
    backgroundColor:'red',
    borderRadius:10,
    padding:10
  }
});

export default VideoComponent;

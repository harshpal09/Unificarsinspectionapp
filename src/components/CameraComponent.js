import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';
import {globalStyles, height, width} from '../utils/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CameraComponent = ({onPhotoCapture,photoArray,fields}) => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const cameraRef = useRef(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [Photos, setPhotos] = useState([]);

  const [isRareCamera, setIsRareCamera] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const device = useCameraDevice(isRareCamera ? 'back' : 'front');



  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Camera permission is required</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // console.log("photo clicked => ",capturedPhotos[0]);

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
    // setCapturedPhotos([]);
    setIsCameraOpen(false);
    setSelectedImage(null); // Reset selected image when closing the camera
  };

  const handleCapturePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePhoto();
      setCapturedPhotos(prevPhotos => [...prevPhotos, photo]);
      // Callback to parent component with the captured photo
      // setPhotos(prevPhotos => [...prevPhotos, photo]);
      const formData = new FormData();
      formData.append('photo', {
        uri: photo.path,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      // console.log("formn dta ",formData._parts[0][1])
      photoArray(formData._parts[0][1]);

      onPhotoCapture && onPhotoCapture(photo);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const handleImageClick = (index) => {
    // console.log("photo click => ",photo);
    setSelectedImage(capturedPhotos[index]);
  };

  




  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[
          styles.openCameraButton,
          globalStyles.rowContainer,
          globalStyles.flexBoxAlign,
        ]}
        onPress={handleOpenCamera}>
        <Text style={styles.openCameraButtonText}>Click Images</Text>
        <MaterialCommunityIcons
          name={'image-multiple'}
          color="white"
          size={25}
        />
      </TouchableOpacity>
      {capturedPhotos.length > 0 && 
          <View style={{marginTop:10,width:'90%'}}>
            <FlatList 
              data={capturedPhotos}
              horizontal
              renderItem={({item,index})=>
              <TouchableOpacity onPress={()=>handleImageClick(capturedPhotos.length - 1)}>
               <Image source={{uri:`file://${item.path}`}} style={{width: 100, height: 100,marginHorizontal:2}} key={index} />
              </TouchableOpacity>
            }
            />
          </View>
      }

      <Modal
        animationType="slide"
        transparent={false}
        visible={selectedImage == null ? isCameraOpen : false}>
        <View style={styles.modalContainer}>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            ref={cameraRef}
            photo={true}
            onInitialized={() => {
              // Initialization logic
            }}
            onError={error => {
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
            <View style={[{width: '33%'}, globalStyles.flexBox]}>
              <View style={styles.capturedPhotosContainer}>
                {/* {capturedPhotos.map((photo, index) => ( */}
                {capturedPhotos.length > 0 ? (
                  <TouchableOpacity
                    // key={index}
                    onPress={() => handleImageClick(capturedPhotos.length - 1)}>
                    <Image
                      source={{
                        uri: `file://${
                          capturedPhotos[capturedPhotos.length - 1].path
                        }`,
                      }}
                      style={styles.capturedPhoto}
                    />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                {/* ))} */}
              </View>
            </View>

            <View style={[{width: '33%'}, globalStyles.flexBox]}>
              <View style={[styles.captureButton, globalStyles.flexBox]}>
                <TouchableOpacity
                  style={[
                    {
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'white',
                      borderRadius: 40,
                    },
                  ]}
                  onPress={handleCapturePhoto}></TouchableOpacity>
              </View>
            </View>
            <View style={[{width: '33%'}, globalStyles.flexBox]}>
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
      </Modal>
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedImage != null}>
          <FlatList
            data={capturedPhotos.reverse()}
            horizontal
            pagingEnabled
            renderItem={({item, index}) => (
              <View style={styles.modalContainer}>
                {/* {console.log("asdfghjkl =",item.path)} */}
                <Image
                  source={{uri: `file://${item.path}`}}
                  style={{width: width, height: height}}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={styles.closeCameraButton}
                  onPress={() => setSelectedImage(null)}>
                  <MaterialCommunityIcons
                    size={45}
                    color={'black'}
                    name={'close-box'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteImageButton}
                  onPress={() => {
                    let arr = capturedPhotos.filter((_, ind) => ind !== index);
                    setCapturedPhotos(arr);
                    if (capturedPhotos.length == 1) {
                      setSelectedImage(null);
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
    // justifyContent: 'center',
    alignItems: 'center',
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
  captureButton: {
    // position: 'absolute',
    // bottom: 20,
    alignSelf: 'center',
    // backgroundColor: 'white',
    padding: 3,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    width: 80,
    height: 80,
  },
  captureButtonText: {
    color: 'white',
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
  closeCameraButtonText: {
    color: 'white',
  },
  capturedPhotosContainer: {
    width: '33%',
    flexDirection: 'row',
    // marginTop: 20,
  },
  capturedPhoto: {
    width: 50,
    height: 50,
    // marginHorizontal: 5,
  },
});

export default CameraComponent;

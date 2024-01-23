// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Modal,
//   FlatList,
//   Platform,
// } from 'react-native';
// import {
//   Camera,
//   useCameraPermission,
//   useCameraDevice,
// } from 'react-native-vision-camera';
// import {THEME_COLOR, globalStyles, height, width} from '../utils/Style';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import {DarkTextLarge} from './StyledComponent';
// import ImagePicker from 'react-native-image-crop-picker';

// const CameraComponent = ({onPhotoCapture, photoArray, deletePhoto, fields}) => {
//   const {hasPermission, requestPermission} = useCameraPermission();

//   const cameraRef = useRef(null);

//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [capturedPhotos, setCapturedPhotos] = useState([]);
//   const [cameraToggle, setCameraToggle] = useState(true);
//   const [Photos, setPhotos] = useState([]);
//   const [showCapturedPhotos, setShowCapturedPhotos] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isRareCamera, setIsRareCamera] = useState(true);
//   const [focusPoint, setFocusPoint] = useState({x: 0, y: 0});
//   const [zoom, setZoom] = useState(1);
//   const [rotate, setRotate] = useState(0);

//   const handleFocus = async tapEvent => {
//     // console.log("handleFocus =>",tapEvent)
//     if (cameraRef.current) {
//       try {
//         const {locationX, locationY} = tapEvent;
//         const screenWidth = width; // Replace with your actual screen width
//         const screenHeight = height; // Replace with your actual screen height

//         // Calculate the normalized coordinates (values between 0 and 1)
//         const x = locationX / screenWidth;
//         const y = locationY / screenHeight;

//         // console.log("x => ",x)
//         // console.log("y =>",y);

//         // Focus the camera at the specified point
//         await cameraRef.current.focus({x, y});
//       } catch (error) {
//         console.error('Error focusing the camera:', error);
//       }
//     }
//   };

//   const requestCameraAndMicrophonePermission = async () => {
//     const microphonePermission = Platform.select({
//       ios: PERMISSIONS.IOS.MICROPHONE,
//       android: PERMISSIONS.ANDROID.RECORD_AUDIO,
//     });

//     const cameraPermission = Platform.select({
//       ios: PERMISSIONS.IOS.CAMERA,
//       android: PERMISSIONS.ANDROID.CAMERA,
//     });

//     try {
//       // Request microphone permission
//       const microphonePermissionStatus = await check(microphonePermission);
//       if (microphonePermissionStatus !== RESULTS.GRANTED) {
//         const microphoneResult = await request(microphonePermission);
//         if (microphoneResult !== RESULTS.GRANTED) {
//           console.log('Microphone permission denied');
//           // Handle denial as needed
//           return;
//         }
//       }

//       // Request camera permission
//       const cameraPermissionStatus = await check(cameraPermission);
//       if (cameraPermissionStatus !== RESULTS.GRANTED) {
//         const cameraResult = await request(cameraPermission);
//         if (cameraResult !== RESULTS.GRANTED) {
//           console.log('Camera permission denied');
//           // Handle denial as needed
//           return;
//         }
//       }

//       console.log('Microphone and camera permissions granted');
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   useEffect(() => {
//     if (fields.value.length > 0) {
//       photoArray('', fields);
//     }
//     requestCameraAndMicrophonePermission;
//   }, []);

//   const device = useCameraDevice(isRareCamera ? 'back' : 'front');

//   if (!hasPermission) {
//     return (
//       <View style={styles.container}>
//         <Text>Camera permission is required</Text>
//         <TouchableOpacity
//           style={[
//             {
//               backgroundColor: THEME_COLOR,
//               color: 'white',
//               width: '100%',
//               borderRadius: 10,
//               padding: 10,
//             },
//             globalStyles.flexBox,
//           ]}
//           onPress={requestCameraAndMicrophonePermission}>
//           <Text style={{color: 'white'}}>Request Permission</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
//   // console.log("photo clicked => ",capturedPhotos[0]);
//   if (!device) {
//     return (
//       <View style={styles.container}>
//         <Text>No camera device available</Text>
//       </View>
//     );
//   }

//   const handleOpenCamera = () => {
//     if (cameraToggle) {
//       setIsCameraOpen(true);
//     } else {
//       pickImageWithCrop();
//     }
//   };
//   const pickImageWithCrop = async () => {
//     ImagePicker.openPicker({
//       width: (4 / 3) * 3264,
//       height: (4 / 3) * 2448,
//       cropping: true,
//     }).then(image => {
//       console.log('from library', image);
//       setCapturedPhotos(prevPhotos => [...prevPhotos, image]);
//       setShowCapturedPhotos(true);

//       imageToBase64(image.path).then(base64 => {
//         photoArray(base64, fields);
//       });
//     });
//   };

//   const handleCropImage = async path => {
//     // Use react-native-image-crop-picker for cropping
//     try {
//       // console.log('Before opening cropper');
//       const croppedImage = await ImagePicker.openCropper({
//         path: Platform.OS === "android" ? ('file://' + path) : path,
//         width: (4 / 3) * 3264,
//         height: (4 / 3) * 2448,
//         freeStyleCropEnabled: true,
//       });
//       // console.log('After opening cropper');
//       return croppedImage;
//     } catch (ee) {
//       console.log('error  => ', ee);
//     }
//   };
//   const handleCloseCamera = () => {
//     setIsCameraOpen(false);
//     setSelectedImage(null); // Reset selected image when closing the camera
//   };

//   const handleCapturePhoto = async () => {
//     try {
//       const photo = await cameraRef.current.takePhoto();

//       const croppedImage = await handleCropImage(photo.path);

//       // console.log("this is crop image=>",croppedImage.path)

//       setCapturedPhotos(prevPhotos => [...prevPhotos, photo]);
//       // console.log("from camera=> ",photo);
//       setShowCapturedPhotos(true);
//       let base64 = await imageToBase64(photo.path);
//       photoArray(base64, fields);
//       onPhotoCapture && onPhotoCapture(photo);
//     } catch (error) {
//       console.error('Error capturing photo:', error);
//     }
//   };

//   const handleImageClick = index => {
//     // console.log("photo click => ",photo);
//     if (capturedPhotos.length > 0) {
//       setSelectedImage(capturedPhotos[index]);
//     } else {
//       console.log('fields value => ', fields.value[index]);
//       setSelectedImage(fields.value[index]);
//     }
//   };

//   const imageToBase64 = async imagePath => {
//     try {
//       // Fetch the image file using the 'file://' URI scheme
//       const response = await fetch(`file://${imagePath}`);
//       const blob = await response.blob();

//       // Convert the blob to Base64
//       const base64 = await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onerror = reject;
//         reader.onload = () => resolve(reader.result.split(',')[1]);
//         reader.readAsDataURL(blob);
//       });

//       // Log or use the Base64 string as needed
//       // console.log('Base64:', base64);

//       return base64;
//     } catch (error) {
//       console.error('Error converting image to Base64:', error);
//       throw error;
//     }
//   };

//   return (
//     <View style={[styles.container]}>
//       <View
//         style={[
//           {backgroundColor: 'transparent', width: '90%', padding: 5},
//           globalStyles.rowContainer,
//         ]}>
//         <TouchableOpacity
//           style={[
//             {
//               borderWidth: cameraToggle ? 3 : 1,
//               backgroundColor: cameraToggle ? 'grey' : 'white',
//               borderColor: cameraToggle ? 'green' : 'grey',
//               padding: 5,
//               margin: 5,
//             },
//           ]}
//           onPress={() => setCameraToggle(true)}>
//           <MaterialCommunityIcons name={'camera'} size={40} color="black" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             {
//               borderWidth: !cameraToggle ? 3 : 1,
//               backgroundColor: !cameraToggle ? 'grey' : 'white',
//               borderColor: !cameraToggle ? 'green' : 'grey',
//               padding: 5,
//               margin: 5,
//             },
//           ]}
//           onPress={() => setCameraToggle(false)}>
//           <MaterialCommunityIcons
//             name={'image-multiple'}
//             size={40}
//             color="black"
//           />
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         style={[
//           styles.openCameraButton,
//           globalStyles.rowContainer,
//           globalStyles.flexBoxAlign,
//         ]}
//         onPress={handleOpenCamera}>
//         <Text style={styles.openCameraButtonText}>
//           {cameraToggle ? 'Click' : 'Choose'} {fields.placeholder}
//         </Text>
//         <MaterialCommunityIcons
//           name={cameraToggle ? 'camera' : 'image-multiple'}
//           color="white"
//           size={25}
//         />
//       </TouchableOpacity>
//       {((capturedPhotos.length > 0 && showCapturedPhotos) ||
//         (fields.value.length > 0 && !showCapturedPhotos)) && (
//         <View style={{marginTop: 10, width: '90%'}}>
//           <FlatList
//             data={
//               showCapturedPhotos
//                 ? capturedPhotos
//                 : fields.value.length > 0
//                 ? fields.value
//                 : []
//             }
//             horizontal
//             renderItem={({item, index}) => (
//               <TouchableOpacity onPress={() => handleImageClick(index)}>
//                 <Image
//                   source={{
//                     uri: showCapturedPhotos ? `file://${item.path}` : item,
//                   }}
//                   style={{width: 100, height: 100, marginHorizontal: 2}}
//                   key={index}
//                 />
//                 <TouchableOpacity
//                   onPress={async () => {
//                     let base64 = await imageToBase64(item.path);
//                     deletePhoto(base64, fields);
//                     let arr = capturedPhotos.filter((_, ind) => ind !== index);
//                     setCapturedPhotos(arr);
//                     if (capturedPhotos.length == 1) {
//                       setSelectedImage(null);
//                     }
//                   }}
//                   style={{
//                     position: 'absolute',
//                     right: 5,
//                     top: 5,
//                     backgroundColor: 'white',
//                   }}>
//                   <MaterialCommunityIcons
//                     name={'trash-can'}
//                     size={20}
//                     color="red"
//                   />
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       )}

//       <Modal
//         style={{backgroundColor: 'black'}}
//         animationType="slide"
//         transparent={false}
//         visible={isCameraOpen}>
//         <View style={styles.modalContainer}>
//           <Camera
//             style={styles.camera}
//             device={device}
//             isActive={true}
//             ref={cameraRef}
//             photo={true}
//             enableZoomGesture
//             onInitialized={() => {
//               // Initialization logic
//             }}
//             resizeMode="contain"
//             zoom={zoom}
//             onError={error => {
//               console.error('Camera error:', error);
//             }}
//             onTouchStart={event => {
//               // Handle touch events to focus the camera
//               const tapEvent = event.nativeEvent;
//               handleFocus(tapEvent);
//             }}
//           />
//           <TouchableOpacity
//             style={styles.closeCameraButton}
//             onPress={handleCloseCamera}>
//             <MaterialCommunityIcons
//               name={'camera-off'}
//               size={40}
//               color={Platform.OS === 'android' ? 'black' : 'white'}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               {
//                 backgroundColor: 'red',
//                 bottom: 120,
//                 left: 10,
//                 position: 'absolute',
//                 padding: 10,
//                 borderRadius: 10,
//               },
//             ]}
//             onPress={() => setZoom(prev => prev + 0.4)}>
//             <DarkTextLarge style={{color: 'white'}}>Zoom In +</DarkTextLarge>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               {
//                 backgroundColor: 'red',
//                 bottom: 120,
//                 right: 10,
//                 position: 'absolute',
//                 padding: 10,
//                 borderRadius: 10,
//               },
//             ]}
//             onPress={() => setZoom(prev => (prev <= 1 ? 1 : prev - 0.4))}>
//             <DarkTextLarge style={{color: 'white'}}>Zoom out -</DarkTextLarge>
//           </TouchableOpacity>
//           <View
//             style={[
//               {
//                 width: '100%',
//                 height: 120,
//                 backgroundColor: 'black',
//                 position: 'absolute',
//                 bottom: 0,
//                 justifyContent: 'space-around',
//               },
//               globalStyles.rowContainer,
//               globalStyles.flexBoxAlign,
//             ]}>
//             <View style={[{width: '33%'}, globalStyles.flexBox]}>
//               <View style={styles.capturedPhotosContainer}>
//                 {/* {capturedPhotos.map((photo, index) => ( */}
//                 {capturedPhotos.length > 0 ? (
//                   <TouchableOpacity
//                     // key={index}
//                     onPress={() => {
//                       setIsCameraOpen(false),
//                         handleImageClick(capturedPhotos.length - 1);
//                     }}>
//                     <Image
//                       source={{
//                         uri: `file://${
//                           capturedPhotos[capturedPhotos.length - 1].path
//                         }`,
//                       }}
//                       style={styles.capturedPhoto}
//                     />
//                   </TouchableOpacity>
//                 ) : (
//                   <></>
//                 )}
//                 {/* ))} */}
//               </View>
//             </View>

//             <View style={[{width: '33%'}, globalStyles.flexBox]}>
//               <View style={[styles.captureButton, globalStyles.flexBox]}>
//                 <TouchableOpacity
//                   style={[
//                     {
//                       width: '100%',
//                       height: '100%',
//                       backgroundColor: 'white',
//                       borderRadius: 40,
//                     },
//                   ]}
//                   onPress={handleCapturePhoto}></TouchableOpacity>
//               </View>
//             </View>
//             <View style={[{width: '33%'}, globalStyles.flexBox]}>
//               <TouchableOpacity onPress={() => setIsRareCamera(!isRareCamera)}>
//                 <MaterialCommunityIcons
//                   name={'camera-flip'}
//                   size={40}
//                   color={'white'}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//       {selectedImage && (
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={selectedImage != null}>
//           <FlatList
//             data={
//               showCapturedPhotos
//                 ? capturedPhotos
//                 : fields.value.length > 0
//                 ? fields.value
//                 : []
//             }
//             horizontal
//             pagingEnabled
//             renderItem={({item, index}) => (
//               <View style={styles.modalContainer}>
//                 {/* {console.log("asdfghjkl =",item.path)} */}
//                 <View
//                   style={{
//                     // backgroundColor: 'red',
//                     width: width,
//                     height: height,
//                     transform: [{rotate: rotate + 'deg'}],
//                   }}>
//                   <Image
//                     source={{
//                       uri: showCapturedPhotos ? `file://${item.path}` : item,
//                     }}
//                     style={{width: width, height: height}}
//                     resizeMode="contain"
//                   />
//                 </View>

//                 <TouchableOpacity
//                   style={styles.closeCameraButton}
//                   onPress={() => setSelectedImage(null)}>
//                   <MaterialCommunityIcons
//                     size={45}
//                     color={'black'}
//                     name={'close-box'}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.rotateImageButton}
//                   onPress={() => setRotate(prev => prev + 90)}>
//                   <MaterialCommunityIcons
//                     size={45}
//                     color={'black'}
//                     name={'crop-rotate'}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.deleteImageButton}
//                   onPress={async () => {
//                     let base64 = await imageToBase64(item.path);
//                     deletePhoto(base64, fields);
//                     let arr = capturedPhotos.filter((_, ind) => ind !== index);
//                     setCapturedPhotos(arr);
//                     if (capturedPhotos.length == 1) {
//                       setSelectedImage(null);
//                     }
//                   }}>
//                   <MaterialCommunityIcons
//                     size={45}
//                     color={'black'}
//                     name={'trash-can'}
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//         </Modal>
//       )}
//     </View>
//   );
// };

// export default CameraComponent;

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles, height, width} from '../utils/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import AWS from 'aws-sdk';
import ImagePicker from 'react-native-image-crop-picker';


AWS.config.update({
  accessKeyId: "42N2S71FD9WL4LT2KLTX",
  secretAccessKey: "K8CYL38U1AOMHV97HW2OVF6AZE1GVZ918IQW270K",
  endpoint: "https://objectstore.e2enetworks.net/unificars1/",
  s3ForcePathStyle: true,
  signatureVersion: "v4"
});

const s3 = new AWS.S3();
const uploadFileToS3 = (bucketName, fileName, filePath) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: filePath,
  };
  return s3.upload(params).promise();
};



export default function CameraComponent({
  onPhotoCapture,
  photoArray,
  deletePhoto,
  fields,
  mediaType,
}) {
  const [cameraToggle, setCameraToggle] = useState(true);
  const [mediaArray, setMediaArray] = useState([]);
  const [showCapturedPhotos, setShowCapturedPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotate, setRotate] = useState(0);

  const handleImagePicker = () => {
    if (cameraToggle) {
      openCamera();
    } else {
      openImagePicker();
    }
  };

  const openCamera = async () => {
    try {
      let options = {
        width: (4 / 3) * 3264,
        height: (4 / 3) * 2448,
        compressImageQuality: 0.1,
        mediaType: mediaType,
        multiple:true,
        
      };
      const result = await ImagePicker.openCamera(options);
      // Check if the user canceled the operation
      const fileContent = await RNFS.readFile(result.path, 'base64');
      try{
      const bucketName = 'unificars1';
      await uploadFileToS3(bucketName, "image.jpg", fileContent)
        console. log ('File uploaded:', "image.jpg");
      } catch (uploadError){ 
        console.error ('Error uploading file:', uploadError);
      }

      if (result && result.path) {
        setMediaArray(prev => [...prev, result]);

        setShowCapturedPhotos(true);
        // Convert the captured media to base64
        if (result.mime.startsWith('image')) {
          convertImageToBase64(result.path)
            .then(base64 => photoArray(base64, fields))
            .catch(e => console.log('error ', e));
        } else if (result.mime.startsWith('video')) {
          convertImageToBase64(result.path)
            .then(base64 => photoArray(base64, fields))
            .catch(e => console.log('error on video saved =>', e));
        }
      } else {
        console.log('User canceled image selection or video recording.');
      }
    } catch (error) {
      console.log('error ->', error);
    }
  };

  const openImagePicker = async () => {
    try {
      let options = {
        width: (4 / 3) * 3264,
        height: (4 / 3) * 2448,
        cropping: mediaType == 'video' ? false : true,
        mediaType: mediaType,
      };

      const result = await ImagePicker.openPicker(options);

      // Check if the user canceled the operation
      if (result && result.path) {
        setMediaArray(prev => [...prev, result]);

        setShowCapturedPhotos(true);
        // Convert the captured media to base64
        // console.log("result mime =>",result.mime)

        if (result.mime.startsWith('image')) {
          convertImageToBase64(result.path)
            .then(base64 => photoArray(base64, fields))
            .catch(e => console.log('error ', e));
        } else if (result.mime.startsWith('video')) {
          convertImageToBase64(result.path)
            .then(base64 => {
              // console.log("sdfghjk=>",base64)
              photoArray(base64, fields)
            })
            .catch(e => console.log('error on video saved =>', e));
        }
      } else {
        console.log('User canceled image selection or video recording.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convertImageToBase64 = async filePath => {
    try {
      const base64 = await RNFS.readFile(filePath, 'base64');
      // console.log('Image Base64:', base64);
      return base64;
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  const convertVideoToBase64 = async filePath => {
    try {
      const base64 = await RNFS.readFile(filePath, 'base64');
      // console.log('Video Base64:', base64);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMediaClick = index => {
    // console.log("photo click => ",photo);
    if (mediaArray.length > 0) {
      setSelectedImage(mediaArray[index]);
    } else {
      console.log('fields value => ', fields.value[index]);
      setSelectedImage(fields.value[index]);
    }
  };
  // console.log("image  => ",fields)
  return (
    <View
      style={[
        {backgroundColor: 'transparent', width: '100%'},
        globalStyles.flexBox,
      ]}>
      <View
        style={[
          {backgroundColor: 'transparent', width: '90%', padding: 5},
          globalStyles.rowContainer,
        ]}>
        <TouchableOpacity
          style={[
            {
              borderWidth: cameraToggle ? 3 : 1,
              backgroundColor: cameraToggle ? 'grey' : 'white',
              borderColor: cameraToggle ? 'green' : 'grey',
              padding: 5,
              margin: 5,
            },
          ]}
          onPress={() => setCameraToggle(true)}>
          <MaterialCommunityIcons name={'camera'} size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              borderWidth: !cameraToggle ? 3 : 1,
              backgroundColor: !cameraToggle ? 'grey' : 'white',
              borderColor: !cameraToggle ? 'green' : 'grey',
              padding: 5,
              margin: 5,
            },
          ]}
          onPress={() => setCameraToggle(false)}>
          <MaterialCommunityIcons
            name={'image-multiple'}
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.openCameraButton,
          globalStyles.rowContainer,
          globalStyles.flexBoxAlign,
        ]}
        onPress={() => handleImagePicker()}>
        <Text style={styles.openCameraButtonText}>
          {cameraToggle ? 'Click' : 'Choose'} {fields.placeholder}
        </Text>
        <MaterialCommunityIcons
          name={cameraToggle ? 'camera' : 'image-multiple'}
          color="white"
          size={25}
        />
      </TouchableOpacity>
      {((mediaArray.length > 0 && showCapturedPhotos) ||
        (fields.value.length > 0 && !showCapturedPhotos)) && (
        <View style={{marginTop: 10, width: '90%'}}>
          <FlatList
            data={
              showCapturedPhotos
                ? mediaArray
                : fields.value.length > 0
                ? fields.value
                : []
            }
            horizontal
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => handleMediaClick(index)}>
                {/* {item.mime != undefined && item.mime.startsWith('image') ? ( */}
                <View>
                  {showCapturedPhotos ? (
                    item.mime != undefined && item.mime.startsWith('image') ? (
                      <Image
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{width: 100, height: 100, marginHorizontal: 2}}
                        key={index}
                      />
                    ) : (
                      <Video
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{width: 100, height: 100, marginHorizontal: 2}}
                        resizeMode="cover"
                        repeat
                      />
                    )
                  ) : item.endsWith("mp4") ? 
                  (
                    <Video
                    
                      source={{
                        uri: item,
                      }}
                      style={{width: 100, height: 100, marginHorizontal: 2}}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item,
                      }}
                      style={{width: 100, height: 100, marginHorizontal: 2}}
                      key={index}
                      
                    />
                  
                  )
                  }
                  <TouchableOpacity
                    onPress={async () => {
                      let base64 = await convertImageToBase64(item.path);

                     if(mediaArray.length > 0){
                      deletePhoto(base64, fields);

                      let arr = mediaArray.filter((_, ind) => ind !== index);
                      setMediaArray(arr);
                      if (mediaArray.length == 1) {
                        setSelectedImage(null);
                      }
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
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedImage != null}>
          <FlatList
            data={
              showCapturedPhotos
                ? mediaArray
                : fields.value.length > 0
                ? fields.value
                : []
            }
            horizontal
            pagingEnabled
            renderItem={({item, index}) => (
              <View style={styles.modalContainer}>
                {/* {console.log("asdfghjkl =",item.path)} */}
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: width,
                    height: height,
                    transform: [{rotate: rotate + 'deg'}],
                  }}>
                 {showCapturedPhotos ? (
                    item.mime != undefined && item.mime.startsWith('image') ? (
                      <Image
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{width: width, height: height, marginHorizontal: 2}}
                        resizeMode='contain'
                        key={index}
                      />
                    ) : (
                      <Video
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{width: width, height: height, marginHorizontal: 2}}
                        resizeMode='contain'
                        repeat
                      />
                    )
                  ) : item.endsWith("mp4") ? 
                  (
                    <Video
                    
                      source={{
                        uri: item,
                      }}
                      style={{width: width, height: height, marginHorizontal: 2}}
                      resizeMode='contain'
                      />
                  ) : (
                    <Image
                      source={{
                        uri: item,
                      }}
                      style={{width: width, height: height, marginHorizontal: 2}}
                      key={index}
                      resizeMode='contain'

                      
                    />
                  
                  )
                  }
                </View>

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
                  style={styles.rotateImageButton}
                  onPress={() => setRotate(prev => prev + 90)}>
                  <MaterialCommunityIcons
                    size={45}
                    color={'black'}
                    name={'crop-rotate'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteImageButton}
                  onPress={async () => {
                    let base64 = await convertImageToBase64(item.path);
                    if(mediaArray.length>0){
                    deletePhoto(base64, fields);
                    let arr = mediaArray.filter((_, ind) => ind !== index);
                    setMediaArray(arr);
                    if (mediaArray.length == 1) {
                      setSelectedImage(null);
                    }
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
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // justifyContent: 'center',
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
    // width:width,
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
  rotateImageButton: {
    position: 'absolute',
    top: 70,
    left: 70,
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

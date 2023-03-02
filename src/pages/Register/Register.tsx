import React, { useState, useRef } from 'react';
import { db, storage } from 'service/firebase_config';
import { doc, setDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString, uploadBytes } from 'firebase/storage';

function Register() {
  // const fileInput = useRef();
  // const profileImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  // const [input, setInput] = useState({
  //   image: profileImg,
  //   name: '',
  //   price: '',
  //   isNew: false,
  //   isBest: false,
  //   detailImage: profileImg,
  //   option: '',
  // });
  // const { name, price, image, isNew, isBest, detailImage, option } = input;

  // const onChange = (e: React.ChangeEvent<HTMLElement>) => {
  //   const { name, value, checked } = e.currentTarget;

  //   if (name === 'image') {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setInput({ ...input, image: file });
  //     } else {
  //       setInput({ ...input, image: profileImg });
  //       return;
  //     }

  //     // 화면에 프로필 이미지 표시
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setInput({ ...input, image: reader.result });
  //       }
  //     };
  //   } else if (name === 'detailImage') {
  //     const fileList = e.target.files.length;
  //     const file = [];
  //     for (let i = 0; i < fileList; i++) {
  //       file.push(e.target.files[i]);
  //     }

  //     if (file) {
  //       setInput({ ...input, detailImage: file });
  //     } else {
  //       setInput({ ...input, detailImage: profileImg });
  //       return;
  //     }

  //     // 화면에 프로필 이미지 표시
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setInput({ ...input, detailImage: file });
  //       }
  //     };
  //   } else if (name === 'isNew' || name === 'isBest') {
  //     setInput({ ...input, [name]: checked });
  //   } else if (name === 'option') {
  //     setInput({ ...input, option: value });
  //   } else {
  //     setInput({ ...input, [name]: value });
  //   }
  // };

  // const uploadProductImage = async () => {
  //   // 1 - firebase store : /products 랜덤 uid로 문서 추가
  //   const productRef = doc(collection(db, 'products'));

  //   // 2 - filebase storage에 1에서 얻은 uid로 productImage 업로드 경로 설정
  //   const productImageRef = ref(storage, `products/${productRef.id}`);

  //   const data = { product: '', detail: [] };

  //   // 3 - 2의 경로에 image 업로드
  //   await uploadString(productImageRef, image, 'data_url');
  //   const url = await getDownloadURL(productImageRef);
  //   // data.product.push(id: productRef.id, url);
  //   data.product = { id: productRef.id, url };

  //   for (var i = 0; i < detailImage.length; i++) {
  //     // 4 - firebase store : /productDetails 랜덤 uid로 문서 추가
  //     const detailRef = doc(collection(db, 'productDetails'));
  //     // 5- filebase storage에 4에서 얻은 uid로 productDetailImage 업로드 경로 설정
  //     const detailImageRef = ref(storage, `productDetails/${detailRef.id}`);
  //     // 6 - detailImage의 길이만큼 map 함수 돌며 5의 경로에 업로드
  //     await uploadBytes(detailImageRef, detailImage[i]);
  //     const url = await getDownloadURL(detailImageRef);
  //     data.detail.push(url);
  //   }

  //   return data;
  // };

  // const uploadProductData = async (data) => {
  //   // firebase store :  productData 업로드
  //   await setDoc(doc(db, 'products', data.product.id), {
  //     id: data.product.id,
  //     image: data.product.url,
  //     name,
  //     price,
  //     new: isNew,
  //     best: isBest,
  //     detailImage: data.detail,
  //     option: option.split(' '),
  //   });
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = await uploadProductImage();
  //   await uploadProductData(data);
  //   alert('O');
  // };

  // const [notice, setNotice] = useState({ first: '', last: '' });

  // const onChangeNotice = (e) => {
  //   const { name } = e.target;

  //   if (name === 'firstNotice') {
  //     const fileList = e.target.files.length;
  //     const file = [];
  //     for (let i = 0; i < fileList; i++) {
  //       file.push(e.target.files[i]);
  //     }

  //     if (file) {
  //       setNotice({ ...notice, first: file });
  //     } else {
  //       setNotice({ ...notice, first: profileImg });
  //       return;
  //     }

  //     // 화면에 프로필 이미지 표시
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setNotice({ ...notice, first: file });
  //       }
  //     };
  //   } else if (name === 'lastNotice') {
  //     const fileList = e.target.files.length;
  //     const file = [];
  //     for (let i = 0; i < fileList; i++) {
  //       file.push(e.target.files[i]);
  //     }

  //     if (file) {
  //       setNotice({ ...notice, last: file });
  //     } else {
  //       setNotice({ ...notice, last: profileImg });
  //       return;
  //     }

  //     // 화면에 프로필 이미지 표시
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setNotice({ ...notice, last: file });
  //       }
  //     };
  //   }
  // };

  // const uploadNoticeImage = async () => {
  //   const data = { firstNotice: [], lastNotice: [] };
  //   for (var i = 0; i < notice.first.length; i++) {
  //     const noticeRef = doc(collection(db, 'notice'));
  //     const noticeImageRef = ref(storage, `notice/${noticeRef.id}`);
  //     await uploadBytes(noticeImageRef, notice.first[i]);
  //     const url = await getDownloadURL(noticeImageRef);
  //     data.firstNotice.push(url);
  //   }

  //   for (var j = 0; j < notice.last.length; j++) {
  //     const noticeRef = doc(collection(db, 'notice'));
  //     const noticeImageRef = ref(storage, `notice/${noticeRef.id}`);
  //     await uploadBytes(noticeImageRef, notice.last[j]);
  //     const url = await getDownloadURL(noticeImageRef);
  //     data.lastNotice.push(url);
  //   }

  //   return data;
  // };

  // const uploadNoticeData = async (data) => {
  //   const noticeRef = doc(collection(db, 'notice'));
  //   await setDoc(doc(db, 'notice', noticeRef.id), {
  //     firstNotice: data.firstNotice,
  //     lastNotice: data.lastNotice,
  //   });
  // };

  // const sumbitNotice = async (e) => {
  //   e.preventDefault();
  //   const data = await uploadNoticeImage();
  //   await uploadNoticeData(data);
  //   alert('O');
  // };
  return (
    <></>
    // <>
    //   <h5>메인이미지</h5>
    //   <img
    //     src={image}
    //     alt="image1"
    //     style={{ width: '130px', height: '130px', borderRadius: '50%' }}
    //     onClick={() => {
    //       fileInput.current.click();
    //     }}
    //   />
    //   <input
    //     type="file"
    //     style={{ display: 'none' }}
    //     accept="image/*"
    //     name="image"
    //     onChange={onChange}
    //     ref={fileInput}
    //   />
    //   <h5>Name</h5>
    //   <input type="text" name="name" value={name} onChange={onChange} />
    //   <h5>Price</h5>
    //   <input type="number" name="price" value={price} onChange={onChange} />
    //   <h5>new</h5>
    //   <input
    //     type="checkbox"
    //     // checked={isNew}
    //     name="isNew"
    //     value={isNew}
    //     onChange={onChange}
    //   />
    //   <h5>best</h5>
    //   <input
    //     type="checkbox"
    //     // checked={isBest}
    //     name="isBest"
    //     value={isBest}
    //     onChange={onChange}
    //   />
    //   <h5>상세이미지</h5>
    //   <input type="file" accept="image/*" name="detailImage" onChange={onChange} multiple />
    //   <h5>옵션 : ' ' 으로 구분하세요</h5>
    //   <input type="text" name="option" value={option} onChange={onChange} />

    //   <br></br>
    //   <button onClick={onSubmit}>제출</button>
    //   <hr />
    //   <h5>first Notice</h5>
    //   <input type="file" accept="image/*" name="firstNotice" onChange={onChangeNotice} multiple />
    //   <h5>last Notice</h5>
    //   <input type="file" accept="image/*" name="lastNotice" onChange={onChangeNotice} multiple />
    //   <button onClick={sumbitNotice}>제출</button>
    // </>
  );
}

export default Register;

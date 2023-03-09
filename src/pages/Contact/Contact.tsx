import React, { useState, useRef, useEffect } from 'react';
import * as S from 'pages/Contact/ContactStyle';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/store';
import Loading from 'components/Loading/Loading';

function Contact() {
  const navigate = useNavigate();
  const contactForm = useRef() as React.RefObject<HTMLFormElement>;

  const [loading, setLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user);

  const [input, setInput] = useState({
    email: '',
    name: '',
    phone: '',
    title: '',
    content: '',
  });

  const { email, name, phone, title, content } = input;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const sendEmail = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Object.keys(user).length) {
      alert('로그인이 필요합니다');
      navigate('/login');
    } else if (!title) {
      alert('제목을 입력하세요');
    } else if (!content) {
      alert('내용을 입력하세요');
    } else {
      setLoading(true);
      emailjs.sendForm('LoversPickMe', 'template_elxg82f', contactForm.current!, '1pots0nXUWB5J7miE').then(() => {
        alert('전송되었습니다');
        setLoading(false);
        navigate('/');
      });
    }
  };

  useEffect(() => {
    user &&
      setInput({
        email: user.email!,
        name: user.name!,
        phone: user.phone!,
        title: '',
        content: '',
      });
  }, [user]);

  return (
    <S.ContactWrapper>
      {loading && <Loading />}
      <S.ContactTitle>CONTACT</S.ContactTitle>
      <S.ContactContent>협업, 프로젝트 등 브랜드에 제안 주실 내용은</S.ContactContent>
      <S.ContactContent>rucasian@korea.com으로 메일을 보내주세요</S.ContactContent>
      <S.ContactForm ref={contactForm} onSubmit={sendEmail}>
        <S.ContactLabel>* 이메일</S.ContactLabel>
        <S.ContactInput
          type="text"
          name="email"
          value={email || ''}
          placeholder="이메일을 입력하세요"
          readOnly={user ? true : false}
          onChange={onChange}
        />
        <S.ContactLabel>* 이름</S.ContactLabel>
        <S.ContactInput
          type="text"
          name="name"
          value={name || ''}
          placeholder="이름을 입력하세요"
          readOnly={user ? true : false}
          onChange={onChange}
        />
        <S.ContactLabel>* 연락처</S.ContactLabel>
        <S.ContactInput
          type="text"
          name="phone"
          value={phone || ''}
          placeholder="연락처를 입력하세요"
          readOnly={user ? true : false}
          onChange={onChange}
        />
        <S.ContactLabel>* 제목</S.ContactLabel>
        <S.ContactInput type="text" name="title" value={title} placeholder="제목을 입력하세요" onChange={onChange} />
        <S.ContactLabel>* 내용</S.ContactLabel>
        <S.ContactTextArea
          //   type="text"
          name="content"
          value={content}
          placeholder="내용을 입력하세요"
          onChange={onChange}
        />

        <S.SendBtn type="submit" value="Finished!" />
      </S.ContactForm>
    </S.ContactWrapper>
  );
}

export default Contact;

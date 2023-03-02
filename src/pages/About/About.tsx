import * as S from 'pages/About/AboutStyle';
import aboutLovers from 'image/About/aboutLovers.png';

function About() {
  return (
    <>
      <S.AboutWrapper>
        <S.AboutImage src={aboutLovers} alt="aboutLovers_image" />
        <S.AboutText>Loverspickme Stationery and more things !</S.AboutText>
        <S.AboutText>
          LOVERSPICKME is a stationery brand that wants to give small but precious happiness to ordinary daily life.
        </S.AboutText>
        <S.AboutText>We hope that all of Loverspickme's items will be such a small gift.</S.AboutText>
      </S.AboutWrapper>
    </>
  );
}

export default About;

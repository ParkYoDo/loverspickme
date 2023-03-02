import React from 'react';
import * as S from 'components/Ckeditor/CkeditorStyle';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface Props {
  state: { title: string; content: string };
  setState: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>;
}

function Ckeditor({ state, setState }: Props) {
  const onEditorChange = (event: React.ChangeEvent, editor: any) => {
    const data = editor.getData();
    setState({ ...state, content: data });
  };

  return (
    <S.EditorWrapper>
      <CKEditor
        editor={ClassicEditor}
        config={{
          language: 'ko',
          placeholder: '내용을 입력하세요.',
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'alignment',
            'outdent',
            'indent',
            'bulletedList',
            'numberedList',
            'blockQuote',
            '|',
            'link',
            'insertTable',
            'imageUpload',
            '|',
            'undo',
            'redo',
          ],
          heading: {
            options: [
              {
                model: 'paragraph',
                view: 'p',
                title: '본문',
                class: 'ck-heading_paragraph',
              },
              {
                model: 'heading1',
                view: 'h1',
                title: '헤더1',
                class: 'ck-heading_heading1',
              },
              {
                model: 'heading2',
                view: 'h2',
                title: '헤더2',
                class: 'ck-heading_heading2',
              },
              {
                model: 'heading3',
                view: 'h3',
                title: '헤더3',
                class: 'ck-heading_heading3',
              },
            ],
          },
          fontSize: {
            options: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
          },
          alignment: {
            options: ['justify', 'left', 'center', 'right'],
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
          },
          image: {
            resizeUnit: 'px',
            toolbar: ['imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight', '|', 'imageTextAlternative'],
            styles: ['full', 'alignLeft', 'alignRight'],
            type: ['JPEG', 'JPG', 'GIF', 'PNG'],
          },
          typing: {
            transformations: {
              remove: ['enDash', 'emDash', 'oneHalf', 'oneThird', 'twoThirds', 'oneForth', 'threeQuarters'],
            },
          },
        }}
        onChange={onEditorChange}
      />
    </S.EditorWrapper>
  );
}

export default Ckeditor;

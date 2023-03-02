import styled from 'styled-components';

export const EditorWrapper = styled.div`
  .ck-editor__editable {
    font-size: 14px;
    overflow-y: scroll !important;
    /* border: 1px solid red !important; */
    border-bottom: none;
    height: 75vh;
    padding: 8px 12px;
  }

  .ck-focused {
    border: none !important;
    box-shadow: none !important;
    border-top: 1px solid #d1d1d1 !important;
  }
`;

import React from 'react';
import styled from 'styled-components';

const InputBox = (props) => {
    const { textarea, type, placeholder, margin, value, enter, _onEnter, _onChange } = props;

    if(textarea) {
        return (
            <>
                <CustomTextarea value={value} margin={margin} placeholder={placeholder} onChange={_onChange} />
            </>
        );
    }

    return (
      <>
        {enter ? (
          <CustomInput
            type={type}
            margin={margin}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                _onEnter(e);
              }
            }}
            onChange={_onChange}
          />
        ) : (
          <CustomInput
            type={type}
            margin={margin}
            placeholder={placeholder}
            onChange={_onChange}
          />
        )}
      </>
    );

    return null;
};

InputBox.defaultProps = {
    textarea : false,
    type : 'text',
    placeholder : '텍스트를 넣어주세요',
    margin: false,
    value : '',
    enter: false,
    _onEnter : () => {},
    _onChange : () => {},
};

const CustomTextarea = styled.textarea`
    border: 1px solid #cacaca;
    width: 100%;
    height: 150px;
    padding: 12px 8px;
    box-sizing: border-box;
    color: #4f4f4f;
    outline: none;
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};
`;

const CustomInput = styled.input`
    border: 1px solid #cacaca;
    width: 100%;
    height: 50px;
    padding: 12px 8px;
    box-sizing: border-box;
    color: #4f4f4f;
    border-radius: 15px;
    outline: none;
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')};

    :focus {
      border: 2px solid #4e8d7c;
    }
`;

export default InputBox;
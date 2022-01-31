import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactSelect from 'react-select';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface SProps {
  name: string;
  containerStyle?: React.CSSProperties;
  options?: Array<object>;
  icon?: React.ComponentType<IconBaseProps>;
  isMulti?: boolean;
  defaultValue?: any;
  placeholder?: string;
  onChange?: (ev: any) => void
}

const Select: React.FC<SProps> = ({
  name, isMulti, containerStyle = {},
  placeholder, onChange,
  icon: Icon, ...rest }) => {
  const selectRef = useRef<any>(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: any) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, isMulti]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
    >

      <ReactSelect
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={selectRef}
        defaultValue={defaultValue}
        classNamePrefix="filter"
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;

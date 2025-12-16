import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

interface ButtonProps {
  $loading: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.$loading ? '#93c5fd' : '#3b82f6'};
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$loading ? '#93c5fd' : '#2563eb'};
  }
`;

const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface UrlFormProps {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({
  url,
  setUrl,
  loading,
  onSubmit
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="url">Enter your long URL</Label>
        <InputGroup>
          <Input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url-path"
            required
          />
          <Button type="submit" $loading={loading}>
            {loading ? (
              <>
                <Spinner />
                Shortening...
              </>
            ) : (
              'Shorten URL'
            )}
          </Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};
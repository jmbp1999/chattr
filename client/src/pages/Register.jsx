import React from 'react';
import styled from 'styled-components';
const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('form');
    };
    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className='brand'>img</div>
                </form>
            </FormContainer>
        </>
    );
};

const FormContainer = styled.div``;

export default Register;

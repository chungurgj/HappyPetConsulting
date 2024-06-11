import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useName } from '../contexts/NameContext';

const Chat = ({ sendMessage, messages, closeConnection, endConsultation, vet, client, pet }) => {
    const { roles } = useName();

    const messageRef = useRef();
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className='chat-room-element'>
            <div className='leave-room'>
                {roles && roles === 'Vet' ? (
                    <div>
                        <h5>{pet}</h5>
                        <strong>{client}</strong>
                    </div>
                ) : (
                    <div><strong>{vet}</strong></div>
                )}

                {roles && roles === 'Vet' ? (
                    <Button variant='danger' onClick={endConsultation}>Заврши</Button>
                ) : (
                    <Button variant='danger' onClick={closeConnection}>Напушти</Button>
                )}

            </div>
            <div className='chat'>
                <div ref={messageRef} className='message-container'>
                    {messages.map((m, index) => (
                        <div key={index} className='user-message'>
                            <div className='message'>{m.message}</div>
                            <div className="from-user">{m.user}</div>
                        </div>
                    ))}
                </div>
                <form
                    className='sendmessageform'
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage(message);
                        setMessage('');

                    }}
                >
                    <div className="send-cont">
                        <input
                            type='text'
                            className='form-control messagebar'
                            placeholder='Порака...'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        <button className='btn btn-primary sendbtnchat' type='submit' disabled={!message}>
                            Прати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;

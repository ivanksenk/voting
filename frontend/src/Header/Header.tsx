import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../API/queryClient';
import React from 'react';
import './header.css';
import { votingStatus } from '../API/votes.api';
import { Loader } from '../Loader/Loader';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {

    const { isPending, error, data } = useQuery({
        queryFn: () => votingStatus(),
        queryKey: ['votingstatus']
    }, queryClient);
    if (isPending) return <Loader />
    if (error) return <h4>Произошла ошибка, попробуйте позднее</h4>
    if (data) {
        return (
            <header className='header'>
                <h4>{data.votesRemaining === 0 ? <>Вы потратили все голоса</> : <>У вас осталось {data.votesRemaining}  голосов</>}</h4>
                <h4>{data.votedCount === 0 ? <>Вы еще не голосовали(</> : <>Вы проголосвали за {data.votedCount} идеи</>}</h4>
            </header>
        );
    }

};
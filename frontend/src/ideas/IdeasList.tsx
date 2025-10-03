import React from 'react';
import { Idea, VotingStatus } from '../types/types';
import { useMutation } from '@tanstack/react-query';
import { voteIdea } from '../API/votes.api';
import { queryClient } from '../API/queryClient';

interface IdeasListProps {
    ideas: Idea[]
}

export const IdeasList: React.FC<IdeasListProps> = ({ ideas }) => {
    const mutation = useMutation({
        mutationFn: voteIdea,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['votingstatus'] });
            queryClient.invalidateQueries({ queryKey: ['ideasList'] })
        },
        onError: (error) => {
            console.error('Ошибка:', error.message);
        },
    })

    const userVoting = queryClient.getQueryData<VotingStatus>(['votingstatus']);
    const votingIdeas = userVoting?.votedIdeas;

    const handleVote = (ideaId: number) => {
        mutation.mutate(ideaId)
    }

    if (!Array.isArray(ideas)) {
        return <p>При загрузке идей произошла ошибка, попробуйте позднее...</p>
    }

    return (
        <ul className='ul-res'>
            {ideas.map((idea) => {
                return (
                    <li key={idea.id} >
                        <h3> {idea.title}</h3>
                        <p>{idea.description}</p>
                        <p>За идею проголосвали {idea.votes} раз(а)</p>
                        {
                            votingIdeas?.includes(idea.id) ?
                                <p>Вы уже проголосовали за эту идею</p>
                                :
                                <button
                                    disabled={mutation.isPending}
                                    onClick={() => handleVote(idea.id)}
                                >
                                    Проголосовать
                                </button>
                        }

                    </li>
                )
            })}
        </ul>
    );
};


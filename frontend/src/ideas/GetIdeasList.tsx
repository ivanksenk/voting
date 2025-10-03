import { useQuery } from "@tanstack/react-query";
import { getIdeasList } from "../API/ideas.api";
import { queryClient } from "../API/queryClient";
import { Loader } from "../Loader/Loader";
import { IdeasList } from "./IdeasList";
import "./ideas.css"

interface GetIdeasListProps {

}

export const GetIdeasList: React.FC<GetIdeasListProps> = () => {
    const { isPending, error, data } = useQuery({
        queryFn: () => getIdeasList(),
        queryKey: ['ideasList']
    }, queryClient);
    if (isPending) return <Loader />
    if (error) return <p>При загрузке идей произошла ошибка, попробуйте позднее...</p>
    if (data) return <IdeasList ideas={data} />
};

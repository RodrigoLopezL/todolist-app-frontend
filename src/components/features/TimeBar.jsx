import { useEffect, useState } from 'react'
import { fetchData } from '../../services/apiService';
import { parseFormatTimePT } from '../utils/dateUtils';
function TimeBar() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const reponse = await fetchData('todos/time');
                setData(reponse);
                
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <p>loading taks...</p>;
    }

    if (error) {
        return <p>Error loading data: {error.message}</p>;
    }
    if (data) {
        return (
            <div className='flex flex-col md:flex-row border-1 border-gray-400 m-4'>
                <div className='basis-1/2 m-2'>
                    <h2 className="text-xl font-bold mb-4 text-center">Average time to finish tasks:</h2>
                    <h2 className="text-xl font-bold mb-4 text-center">{parseFormatTimePT(data.AvgTotalTime)}</h2>
                </div>
                <div className='basis-1/2 m-2'>
                    <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Average time to finish tasks by priority:</h2>
                    <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Low= {parseFormatTimePT(data.avgTimeLowPriority)}</h2>
                    <h2 className="text-xl font-bold mb-4 text-center lg:text-left">Medium= {parseFormatTimePT(data.avgTimeMediumPriority)}</h2>
                    <h2 className="text-xl font-bold mb-4 text-center lg:text-left">High= {parseFormatTimePT(data.avgTimeHighPriority)}</h2>
                </div>
            </div>
        );
    }
    return null;

};

export default TimeBar;
import { useEffect, useState } from "react";
import axios from "axios";

function SearchComponent () {
    const [placeToVisit, setPlaceTovisit] = useState("");
    const [placeToVisitList, setPlaceTovisitList] = useState([]);

    async function handleChange(placeToVisit) {
        try {
            const findPlaceToVisit = "http://localhost:4001/trips?keywords=" + placeToVisit;
            const result = await axios.get(findPlaceToVisit);
            console.log(result);
            setPlaceTovisitList(result.data.data);
        } catch (error) {
            console.log("Error fecthing  data",error);
        }
    }

    useEffect(() => {
        if (placeToVisit) {
            handleChange(placeToVisit);
        }
    }, [placeToVisit]);

    function handleClick(tag) {
        setPlaceTovisit(tag);
    }

    return (
        <div className="search-container">
            <h1>
                เที่ยวไหนดี
            </h1>
            <div className="search-box">
                <p>
                    ค้นหาที่เที่ยว
                </p>
                <input type="text" className="input-search" placeholder="หาที่เที่ยวแล้วไปกัน ..." value={placeToVisit}
                    onChange={(event) => {setPlaceTovisit(event.target.value)}}
                ></input>
            </div>
            
            <div className="displayPlaceList">
            
                {
                    placeToVisitList.length > 0 ? (
                        <>
                        {
                            placeToVisitList.map((item, index) => (
                                <div key={item.eid} className="preview-card">
                                    <div className="main-image">
                                        <img src={item.photos[0]} alt="main-photo"></img>
                                    </div>
                                    <div className="preview-detail">
                                        <h1><a href={item.url}>{item.title}</a></h1>
                                        <p>
                                            {item.description}
                                        </p>
                                        <div>
                                            <a href={item.url}>อ่านต่อ</a>
                                        </div>
                                        <div className="preview-tags">
                                            <div>
                                                หมวด
                                            </div>
                                            {item.tags.map((tag, order) => (
                                                <a key={order} href="#" onClick={() => handleClick(tag)}>{tag}</a>
                                            ))}
                                        </div>
                                        <div className="second-images">
                                            <img src={item.photos[1]} alt="second-photo"></img>
                                            <img src={item.photos[2]} alt="second-photo"></img>
                                            <img src={item.photos[3]} alt="second-photo"></img>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                        </>
                    ) : (<li>No place found</li>)
                }
            
            </div>
        </div>
    )
}

export default SearchComponent;
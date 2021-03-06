import {React, useState, useEffect} from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import axios from 'axios';
import {Container, Col, Form} from 'react-bootstrap'
import SelectedVideo from './SelectedVideo';


const VideoLibrary = (props) => {
    
    const allVideosURL = 'http://localhost:3000/videos'

    // set up URL with search

    const [videos, setVideos] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)

    function addVideoCallback (video) {
        const newVideoList = [...videos, video]
        setVideos(newVideoList)
    }

    useEffect(() => {
        axios.get(allVideosURL)
        .then((response) => {
            const RailsApiVideoList = response.data
           console.log('videos ====>', RailsApiVideoList)
            setVideos(RailsApiVideoList);
        })
        .catch((error) => {
            setErrorMessage(error.message);
            console.log(errorMessage);
        });
    }, []);

    return (
        <div>
            <br/>
                <Col lg={10}>
                <h3>Video Library</h3>
                <Form.Label>Select or Search for a Video: </Form.Label>
                    <Select
                        value={props.selectedVideo}
                        onChange={props.onSelectVideo}
                        options={videos.map((video, index) => {
                        
                        return {
                        label: video.title,
                        value: video,
                        key: index
                        };
                        })}
                    />  
                </Col>
            <br/>
        </div>
    )
}

VideoLibrary.propTypes = {}

export default VideoLibrary

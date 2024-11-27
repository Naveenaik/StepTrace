// import React from 'react'
import VideoStream from "../components/VideoStream"

const About = () => {
  return (
    <div>
      {/* <VideoStream streamURL={"http://192.168.64.6:8080/video"}/> */}
      <VideoStream streamURL={"http://192.168.43.1:8080/video"}/>
    </div>
  )
}

export default About
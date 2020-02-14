import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import './card.scss'

const Card = props => {
    const styles = {}
    if(props.cardColor) {
        styles["backgroundColor"] = props.cardColor
    }
    if(props.cardHeight) {
        styles['height'] = props.cardHeight
    }
     if(props.cardWidth) {
        styles['width'] = props.cardWidth
    }
    
     if(props.loader) {
        return (
            <Dimmer.Dimmable blurring dimmed={props.apiStatus === 0} className={`${props.class? props.class : ''}`} >
                <Dimmer inverted active={props.apiStatus === 0}>
                    <Loader>{props.loadingText}</Loader>
                 </Dimmer>
                <div style={styles} className={`card ${props.class? props.class : ''}`} ref={props.refer ? props.refer : null} {...props}>
                    {props.children}
                </div>
            </Dimmer.Dimmable>)
        }
        else return(
            <div style={styles} className={`card ${props.class? props.class : ''}`} ref={props.refer ? props.refer : null} {...props}>
                {props.children}
            </div>)
}
export default Card
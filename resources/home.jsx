/* @jsx m */
import m from 'mithril'
import { Test } from '../helpers/test'

export const Home = () => {

    
    function getColors() {
        console.log("initializing")
        // calling
        m.request({
                method: 'GET',
                url: `http://localhost:8001/color/retrieve`,
            })
            //gives a response on button press
            .then((response) => {
                if (response) {
                    let data = response
                    console.log("data", data)

                    document.querySelector(".returnText").innerHTML = `Supported colors are:` + data
                }
            })
    }
    //begins to send color to colorhandler, checking against list of supported colors
    function convertColor() {
        var colorEntry = document.querySelector(".convertValue")
        var entryValue = colorEntry.value
        m
            .request({
                method: 'PUT',
                url: `http://localhost:8001/color/handle`,
                body: {
                    "value": entryValue
                }
            })
            //should return hex! otherwise error
            .then((response) => {
                if (response) {
                    let data = response
                    console.log("data", data)

                    if (response != "Color not supported") {

                        document.querySelector(".returnText").innerHTML = `Hex value is ` + data
                        let root = document.documentElement

                        root.style.setProperty('--color', '#' + data)
                        return
                    }
                    document.querySelector(".returnText").innerHTML = `Error! ` + data
                    
                }
            })


    }

    return {

        view: (vnode) => {


            return (
                <div>
                    <div>
                        Hex Color Translator
                    </div>
                    <br></br>
                    <div class="data">
                        <div>Enter plaintext color</div>
                        <input class="convertValue" ></input>
                        <button onclick={convertColor}>go!</button>
                    </div>
                    <br></br>
                    <button onclick={getColors}>List supported colors</button>
                    <div class="returnText"></div>
                    <div class="colorBox"></div>
                </div>

            )
        }
    }






}

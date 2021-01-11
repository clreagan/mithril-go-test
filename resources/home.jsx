/* @jsx m */
import m from 'mithril'
import { Test } from '../helpers/test'

export const Home = () => {

    // vars etc
    function getColors() {
        console.log("initializing")
        // calling
        m
            .request({
                method: 'GET',
                url: `http://localhost:8002/color/retrieve`,
            })
            .then((response) => {
                if (response) {
                    let data = response
                    console.log("data", data)

                    document.querySelector(".returnText").innerHTML = `Supported colors are:` + data
                }
            })
    }

    function convertColor() {
        var colorEntry = document.querySelector(".convertValue")
        var entryValue = colorEntry.value
        m
            .request({
                method: 'PUT',
                url: `http://localhost:8002/color/handle`,
                body: {
                    "value": entryValue
                }
            })
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
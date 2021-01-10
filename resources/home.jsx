/* @jsx m */
import m from 'mithril'
import { Test } from '../helpers/test'

export const Home = () => {

    // vars and things

    return {

        view: (vnode) => {
            return (
                <div>
                    <div>
                        HTML 'N' stuff
                    </div>
                    <div>
                        MORE STUFF
                    </div>
                    {m(Test, { info: "yes" })}
                </div>

            )
        }
    }






}
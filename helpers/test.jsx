/* @jsx m */
import m from 'mithril'

export const Test = () => {

    return {
        view: (vnode) => {
            return (
                <div>
                    <div> Something else</div>
                    <div>The content of VNODE is {vnode.attrs.info} </div>
                </div>
            )
        }
    }


}
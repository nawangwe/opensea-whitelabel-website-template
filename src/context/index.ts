import { createContext } from "react"

interface ContextType {
    addressValue: any
    providerValue: any
    connectedValue: any
    web3Value: any
}
export const Context= createContext<ContextType>({
    addressValue: ["", () => {}],
    providerValue: [null, () => {}],
    connectedValue: [false, () => {}],
    web3Value: [null, () => {}]
})

export default Context
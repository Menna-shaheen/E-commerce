import { createContext } from "react";
import { date } from "yup";

export let CounterContext = createContext()
export default function CounterContextProvider(props) {
    <CounterContext.Provider value={{ date }}>
        {props.children}
    </CounterContext.Provider>
}
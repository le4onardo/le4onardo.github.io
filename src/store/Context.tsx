import { createContext, PropsWithChildren, useState } from 'react';

interface ThreeState {
    colorOffset?: number;
    friction?: number;
}

interface Context {
    threeState?: ThreeState;
    updateThreeState?: (newState: ThreeState) => void;
}

interface Props extends PropsWithChildren {
    initialState?: ThreeState;
}

export const StateContext = createContext<Context>({});

const StateProvider = ({ children, initialState = {} }: Props) => {
    const [threeState, setThreeState] = useState(initialState);
    const updateThreeState = (newState: ThreeState) => {
        setThreeState({ ...threeState, ...newState });
    };

    return <StateContext.Provider value={{ threeState, updateThreeState }}>{children}</StateContext.Provider>;
};

export default StateProvider;

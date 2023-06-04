import { Provider } from "react-redux"
import { AppRoutes } from "./AppRoutes"
import { store } from "./store/store"

export const SoundApp = () => {

    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    )
    
}
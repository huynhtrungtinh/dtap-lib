import { PageDecorator } from '@dtap/ui-core';
import { cloneDeep, get } from 'lodash';
import BackdropComponent from './backdrop-component';
import { PATH_TO_STORE_REDUX } from './backdrop-constants';
import reducers from './backdrop-reducers';

const mapStateToProps = (state: any) => {
    let stateRedux = get(state, `${PATH_TO_STORE_REDUX}`, {});
    return {
        isOpen: cloneDeep(stateRedux.isShowBackdrop),
        background: stateRedux.background,
        iconColor: stateRedux.iconColor
    };
};
const mapDispatchToProps = () => {
    return {};
};

const Backdrop = PageDecorator({
    resources: [reducers],
    actions: mapDispatchToProps(),
    mapState: (state: any) => mapStateToProps(state)
})(BackdropComponent);
export default Backdrop;
export { Backdrop };


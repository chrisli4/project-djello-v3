import withUpdate from '../hoc/withUpdate'
import Input from '../elements/input'
import classNames from 'classnames';

const CustomInput = ({ disable, cx, onUpdate, name, value }) => (
	<input className={cxs} disabled={!disable} name={name} value={value} onChange={onUpdate} />
	)


export default withUpdate(CustomInput); 
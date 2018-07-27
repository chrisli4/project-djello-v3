import withUpdate from '../hoc/withUpdate'
import classNames from 'classnames';

const Textarea = ({ edit, cx, onUpdate, name, value }) => {
	
	let cxs = classNames('form-control-plaintext', cx)
	return (
		<textarea className={cxs} disabled={!edit} name={name} value={value} onChange={onUpdate} />
		)
}

export default withUpdate(Textarea); 
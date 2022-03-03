import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
	editorClass: {
		height: '94vh'
	},
	'@media only screen and (min-width: 1370px)': {
		editorClass: {
			height: '100vh'
		},
	}
})

export default useStyle;
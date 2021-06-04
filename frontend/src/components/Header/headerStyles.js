import {createStyles, fade, makeStyles} from "@material-ui/core";

const headerStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
            padding: '12px 0',
            verticalAlign: 'middle'
        },
        btnHome: {
            marginLeft: 0,
            padding: '12px 0'
        }
    })
);

export default headerStyles;

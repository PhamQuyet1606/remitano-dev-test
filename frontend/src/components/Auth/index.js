import React, {useState, useContext} from 'react';
import CustomCircularProgress from "../shared/CustomCircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
import * as ACTIONS from '../../actions';
import * as authService from "../../services/authService";
import {AppContext} from "../../contexts/AppContext";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";

const authFormStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: '12px 0',

    },
    form: {
        width: 800,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    container: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    text: {
        minWidth: 120
    },
    type: {
        fontWeight: 600
    },
    formControl: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
            minWidth: "100%",
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    },
    input: {
        padding: "10px 14px",
        fontSize: "12px",
    },
    textBox: {
        maxWidth: 180,
        height: '100%',
    },
    submitBtn: {
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        }
    }
}));

const AuthComponent = () => {
    const [ state, dispatch ] = useContext(AppContext);

    return (
        <Grid container>
            <Grid item xs={12}>
                { !state.authenticated ?
                    (
                        <AuthInputForm state={state} dispatch={dispatch} />
                    ) :
                    (
                        <AuthMenu state={state} dispatch={dispatch} />
                    )
                }
            </Grid>
        </Grid>
    );
};

const AuthInputForm = ({state, dispatch}) => {
    const classes = authFormStyle();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [inputValues, setInputValues] = useState({
        email: '', password: ''
    });

    function fetchProfile() {
        authService.fetchProfile()
            .then((res) => {
                let user = res.data.user;
                dispatch(ACTIONS.fetch_profile_success({
                    email: user.email,
                    uid: user.uid
                }));
            })
            .catch((err) => {
                alert(err.response.data.error.message);
                setErrors(err.response.data);
                dispatch(ACTIONS.fetch_profile_failure(err.response.data));
            })
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        setLoading(true);
        authService.doAuth(inputValues.email, inputValues.password)
            .then((res) => {
                setErrors([]);
                dispatch(ACTIONS.auth_success(res.data.token));
                fetchProfile();
            })
            .catch((err) => {
                alert(err.response.data.error.message);
                setErrors(err.response.data);
                dispatch(ACTIONS.auth_failure(err.response.data));
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className={classes.root}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <FormControl
                    className={clsx(classes.formControl, classes.textBox)}
                >
                    <TextField
                        required
                        placeholder="Email"
                        id="email"
                        name="email"
                        size="small"
                        autoComplete="email"
                        variant="outlined"
                        helperText={errors.email}
                        error={!!errors.email}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl
                    className={clsx(classes.formControl, classes.textBox)}
                >
                    <TextField
                        required
                        placeholder="Password"
                        id="password"
                        name="password"
                        type="password"
                        size="small"
                        autoComplete="password"
                        variant="outlined"
                        helperText={errors.password}
                        error={!!errors.password}
                        onChange={handleChange}
                    />
                </FormControl>
                {loading ?
                    (
                        <CustomCircularProgress />
                    ) :
                    (
                        <Button className={classes.submitBtn} size="medium" color="primary" type="submit" variant="contained">
                            Login / Sign Up
                        </Button>
                    )
                }
            </form>
        </div>
    );
};

const AuthMenu = ({state, dispatch}) => {
    const classes = authFormStyle();
    const handleLogout = (evt) => {
        evt.preventDefault();
        dispatch(ACTIONS.un_auth());
    };

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                <FormControl className={clsx(classes.formControl, classes.text)}>
                    <Typography variant="body1" className={classes.type}>
                        Hello, {state.profile.email}
                    </Typography>
                </FormControl>
                <Button className={classes.submitBtn} href='/shareVideo' color="primary" margin="normal" size="medium" variant="contained">
                    Share Video
                </Button>
                <Button className={classes.submitBtn} color="primary" margin="normal" size="medium"  onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default AuthComponent;

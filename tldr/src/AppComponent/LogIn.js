import React, {Fragment} from 'react'
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Card, { CardMedia, CardContent, CardActions } from 'material-ui/Card';
import LoginImage from '../Assets/LoginImage.jpg';

const loginstyles = theme => ({
    cardStyle: {
        width: "450px",
        height: "210px",
        marginLeft: "250px",
        marginTop: "-200px"
    },

    textFieldStyle: {
        marginLeft: "-230px",
        marginTop: "-10px"
    },

    labelStyle:{
        fontFamily: 'Dosis, sans-serif',
        fontSize: "28px",
        marginLeft: "-300px",
        paddingTop: "10px"
    },

    buttonStyle: {
      marginLeft: "20px",
      marginTop: "-150px"
    },

    coverImage:{
        width: "215px",
        height: "210px",
        marginLeft: "250px",
        marginTop: "-120px"
    },

    instructionText:{
        fontFamily: 'Dosis, sans-serif',
        fontSize: "18px",
        width: "450px",
        height: "200px",
        marginLeft: "250px",
        marginTop: "10px",
        textAlign: "left"
    }
});


const LogInPanel = (props)=>{
    const { classes } = props;
    return(
      <Fragment>
         <Card className={classes.cardStyle}>
            <Typography className={classes.labelStyle}>
                Welcome!
            </Typography>
            <CardContent>
                <TextField 
                    value={props.TokenField}
                    type="Token"
                    placeHolder="Token"
                    label="Add 12 digit Token"
                    disabled={(props.disable)? "disabled" : false}
                    onChange={props.onChangeClick}
                    className={classes.textFieldStyle}
                />
            </CardContent>
             <CardMedia
                className={classes.coverImage}
                image={LoginImage}
            />
            <CardActions>
               <Button 
                  raised color="primary" 
                  onClick={(e) => props.successfulLoginFunc(e)}
                  className={classes.buttonStyle}
               >
                  {props.buttonIcon}
               </Button>
            </CardActions>
          </Card>         
           <Typography className={classes.instructionText}>
               Please get a token before using this app. You can
               get a token by clicking the Get Token button.
               Once you get a token, please paste it onto the
               text field. Currently, we only support Chrome Web-browser.
               (Sorry Firefox and Safari people!) Thank you for choosing PaperGene!
          </Typography>   
     </Fragment>      
    )
}

export default withStyles(loginstyles)(LogInPanel);

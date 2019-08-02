import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";



class SimpleSelect extends React.Component {
    

    render() {
      const { id, MenuItemValues, handleChange, value, name, style} = this.props;

        return (
          <form>
            <FormControl>
              <Select
                style={{minWidth: 120}}
                value={value}
                onChange={handleChange}
                input={
                  <OutlinedInput name={name} id={id} />
                }
              >
                  {MenuItemValues.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </form>
        );
      }
    }
    
    SimpleSelect.propTypes = {
      classes: PropTypes.object.isRequired
};
    
export default (SimpleSelect);



    
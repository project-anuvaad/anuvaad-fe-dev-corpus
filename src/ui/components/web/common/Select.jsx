import React from "react";
import PropTypes from "prop-types";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";



class SimpleSelect extends React.Component {
    

    render() {
      const { id, MenuItemValues, handleChange, value, name} = this.props;

        return (
          <form>
            <FormControl>
              <Select
                style={{minWidth: 160,align:'right',maxWidth:160}}
                value={value}
                onChange={handleChange}
                input={
                  <OutlinedInput labelWidth={200} name={name} id={id}/>
                }
              >
                  {MenuItemValues.map((item) => (
                    <MenuItem key={item.language_code} value={item.language_code}>{item.language_name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </form>
        );
      }
    }
    
export default (SimpleSelect);



    
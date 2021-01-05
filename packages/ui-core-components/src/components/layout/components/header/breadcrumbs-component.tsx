import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip";
import React from 'react';
import {I18n} from 'react-redux-i18n';
import {useHistory} from 'react-router-dom';
import {KEY_TRANSLATE} from '../../constants';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
    maxHeight: 44,
    minHeight: 44,
    lineHeight: '45px',
  },
  link: {
    display: 'flex',

    cursor: 'pointer'
    // color: theme.palette.primary.contrastText
  },
  text: {
    display: 'flex',
    cursor: 'default',
    // lineHeight: 0,
  }
}));

function BreadcrumbsComponent(props: any) {
  const classes = useStyles();
  const {tabs = [], breakpoint = "lg", setClickItem = () => null} = props;
  const history = useHistory();

  const handleClick = (tab: any) => () => {
    setClickItem(tab, history);
    // history.push("/");
  };

  if (tabs && tabs.length > 0) {
    return (
      <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
        {
          tabs.map((t: any, index: any) => {
            if (t.name) {
              let Item: any = <></>;
              let label = "";
              let labelFull = "";
              labelFull = I18n.t(`${KEY_TRANSLATE}.${t.name}`)
              label = labelFull.length > 20 ? `${labelFull.substr(0, 20)}....` : labelFull;
              if (breakpoint === "xs" || breakpoint === "sm") {
                if (index === tabs.length - 1) {
                  return (
                    <Link key={index} color="inherit" onClick={handleClick(t)} className={classes.link}>
                      {label}
                    </Link>
                  )
                }
                return ("")
              }

              switch (index) {
                case 0: {
                  Item = (
                    <Link key={index} color="inherit" onClick={handleClick(t)} className={classes.link}>
                      {label}
                    </Link>
                  )
                  break;
                }
                case 1: {
                  Item = (
                    <span key={index} className={classes.text}>
                      {label}
                    </span>
                  )
                  break;
                }
                case 2: {
                  Item = (
                    <span key={index} className={classes.text}>
                      {label}
                    </span>
                  )
                  break;
                }
                default:
                  break;
              }
              if (labelFull.length > 20) {
                return (
                  <Tooltip
                    title={labelFull}
                    placement="top"
                    key={index}
                  >
                    {Item}
                  </Tooltip>
                )
              }
              return (Item)
            } else {
              return <></>
            }
          })
        }
      </Breadcrumbs>
    );
  }
  return <></>
}

export default BreadcrumbsComponent;
export {BreadcrumbsComponent};


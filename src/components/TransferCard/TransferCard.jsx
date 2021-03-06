import React from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, makeStyles } from '@material-ui/core';
import { cashFlowLabels, eventsTransferCard } from '../../constant/transfer';
// import useHover from '../../hooks/hoover.hook';
import './TransferCard.css';
import { formatDate } from '../../lib/date';

const useStyles = makeStyles(() => ({
  header: {
    display : 'flex',
    margin  : '20px 0',
  },
  actionsBtn: {
    display    : 'flex',
    alignItems : 'center',
    transition : 'transform 200ms ease',
  },
}));

const TransferCard = ({
  transfer,
  transferCardEvent,
}) => {
  const classes = useStyles();
  // const [hovered, setHovered] = useState(false);

  // const {
  //   hovered, onMouseEnter, onFocus, onMouseLeave, onBlur,
  // } = useHover();
  // console.log('hovered', hovered);

  let labelCard;
  let amountCard;
  switch (transfer.cashFlow) {
    case cashFlowLabels.ingreso:
      labelCard = <div className={`transfer-card__label ${cashFlowLabels.ingreso}`}>Ingreso</div>;
      amountCard = <div>{`+ S/. ${transfer.amount}`}</div>;
      break;
    case cashFlowLabels.egreso:
      labelCard = <div className={`transfer-card__label ${cashFlowLabels.egreso}`}>Egreso</div>;
      amountCard = <div>{`- S/. ${transfer.amount}`}</div>;
      break;

    default:
      break;
  }

  const emitUpdate = () => {
    transferCardEvent({
      type    : eventsTransferCard.update,
      payload : transfer,
    });
  };

  const emitDelete = () => {
    transferCardEvent({
      type    : eventsTransferCard.delete,
      payload : transfer,
    });
  };

  return (

    // <div
    //   className="card transfer-card"
    //   onMouseEnter={onMouseEnter}
    //   onFocus={onFocus}
    //   onMouseLeave={onMouseLeave}
    //   onBlur={onBlur}
    // >
    <div
      className="card transfer-card"
    >
      <div className={classes.header}>
        <div>
          {transfer.description}
        </div>
        <span className="spacer" />
        {
          amountCard
        }
        {
          labelCard
        }
      </div>
      <Divider />
      <div className={classes.actionsBtn}>
        <div>
          { formatDate(transfer.dateTransfer) }
        </div>
        <span className="spacer" />
        <Button
          onClick={emitUpdate}
          color="primary"
          autoFocus
        >
          Actualizar
        </Button>
        <Button
          onClick={emitDelete}
          color="primary"
          autoFocus
        >
          Eliminar
        </Button>
      </div>
    </div>

  );
};
TransferCard.propTypes = {
  transfer: PropTypes.shape({
    description  : PropTypes.string.isRequired,
    details      : PropTypes.string.isRequired,
    amount       : PropTypes.number.isRequired,
    dateTransfer : PropTypes.string.isRequired,
    cashFlow     : PropTypes.string.isRequired,
    _id          : PropTypes.string,
  }).isRequired,
  transferCardEvent: PropTypes.func.isRequired,
};

export default TransferCard;

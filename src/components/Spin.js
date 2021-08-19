import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
})

const SpinComponent = ({ isLoading }) => {
  return (
    <>
      {isLoading ? (
        <div className="spin">
          {isLoading ?<Spin /> : null} 
        </div>
      ) : null}
    </>
  )
}

export default connect(mapStateToProps, null)(SpinComponent);
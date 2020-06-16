import { connect } from 'react-redux';

export function withRedux(options, manualStateToProps, manualDispatchToProps) {
  return function (Component) {
    const mapStateToProps = Component.mapStateToProps || Component.withState
    || manualStateToProps || null;
    const mapDispatchToProps = Component.mapDispatchToProps || Component.withActions
    || manualDispatchToProps || null;
    return connect(mapStateToProps, mapDispatchToProps, null, options)(Component);
  };
}

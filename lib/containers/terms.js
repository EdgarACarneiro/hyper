import Terms from '../components/terms';
import {connect} from '../utils/plugins';
import {
  resizeSession,
  sendSessionData,
  exitSessionBrowser,
  setSessionXtermTitle,
  setActiveSession
} from '../actions/sessions';
import {openContextMenu} from '../actions/ui';
import getRootGroups from '../selectors';

const TermsContainer = connect(
  state => {
    const {sessions} = state.sessions;
    const currentPane = state.ui.panesFontSize[state.ui.activeUid];
    console.log("state: "); console.log(state);
    console.log("opa"); console.log(state.ui.panesFontSize);
    console.log("uba"); console.log(currentPane);
    console.log("ehe"); console.log(currentPane == undefined);
    return {
      sessions,
      cols: state.ui.cols,
      rows: state.ui.rows,
      termGroups: getRootGroups(state),
      activeRootGroup: state.termGroups.activeRootGroup,
      activeSession: state.sessions.activeUid,
      customCSS: state.ui.termCSS,
      write: state.sessions.write,
      fontSize: (state.ui.globalZoom || (currentPane == undefined))?
                  (state.ui.fontSizeOverride ? state.ui.fontSizeOverride : state.ui.fontSize) :
                  currentPane.paneFontSize,
      testFontSize: state.ui.panesFontSize,
      fontFamily: state.ui.fontFamily,
      uiFontFamily: state.ui.uiFontFamily,
      fontSmoothing: state.ui.fontSmoothingOverride,
      padding: state.ui.padding,
      cursorColor: state.ui.cursorColor,
      cursorShape: state.ui.cursorShape,
      cursorBlink: state.ui.cursorBlink,
      borderColor: state.ui.borderColor,
      colors: state.ui.colors,
      foregroundColor: state.ui.foregroundColor,
      backgroundColor: state.ui.backgroundColor,
      bell: state.ui.bell,
      bellSoundURL: state.ui.bellSoundURL,
      globalZoom: state.ui.globalZoom,
      copyOnSelect: state.ui.copyOnSelect,
      modifierKeys: state.ui.modifierKeys,
      quickEdit: state.ui.quickEdit
    };
  },
  dispatch => {
    return {
      onData(uid, data) {
        dispatch(sendSessionData(uid, data));
      },

      onTitle(uid, title) {
        dispatch(setSessionXtermTitle(uid, title));
      },

      onResize(uid, cols, rows) {
        dispatch(resizeSession(uid, cols, rows));
      },

      onURLAbort(uid) {
        dispatch(exitSessionBrowser(uid));
      },

      onActive(uid) {
        dispatch(setActiveSession(uid));
      },

      onContextMenu(uid, selection) {
        dispatch(setActiveSession(uid));
        dispatch(openContextMenu(uid, selection));
      }
    };
  },
  null,
  {withRef: true}
)(Terms, 'Terms');

export default TermsContainer;

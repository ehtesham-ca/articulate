import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import PropTypes from 'prop-types';
import { Grid, Typography, Button, Modal, Tabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import messages from '../messages';
import { map } from 'lodash';

import agentIcon from '../../../images/agents-icon.svg';
import playHelpIcon from '../../../images/play-help-icon.svg';
import SayingsDataForm from './SayingsDataForm';
import KeywordsDataForm from './KeywordsDataForm';
import ActionsDataForm from './ActionsDataForm';
import PopoverFilter from './../../../components/PopoverFilter';

const styles = {
  headerContainer: {
    backgroundColor: '#f6f7f8',
    border: '1px solid #c5cbd8',
    borderRadius: '5px',
    marginBottom: '60px',
  },
  titleContainer: {
    padding: '25px',
  },
  agentIcon: {
    display: 'inline',
    paddingRight: '10px',
    height: '30px',
  },
  titleTextHelpContainer: {
    display: 'inline',
    position: 'relative',
    bottom: '6px',
  },
  title: {
    display: 'inline',
    paddingRight: '25px',
  },
  helpButton: {
    display: 'inline',
    width: '50px',
    height: '20px',
  },
  playIcon: {
    height: '10px',
  },
  helpText: {
    fontSize: '9px',
    fontWeight: 300,
    position: 'relative',
    bottom: '2px',
    paddingLeft: '2px',
  },
  agentTabs: {
    paddingLeft: '15px'
  },
  selected: {
    color: '#4e4e4e',
    border: '1px solid #C5CBD8',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    backgroundColor: '#fff',
    borderBottom: '0px',
  },
  modalContent: {
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
    boxShadow:
      '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
  },
  settingsIcon: {
    height: '18px',
    paddingRight: '5px',
    position: 'absolute',
  },
  notificationDot: {
    backgroundColor: '#Cb2121',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    position: 'absolute',
    top: '10px',
    left: '5px',
  },
  numOfErrorsLabel: {
    fontSize: '10px',
    color: 'white',
    position: 'relative',
    bottom: '4.5px',
    left: '0.5px',
  },
  tabLabel: {
    padding: '0px 10px',
    position: 'relative',
    top: '5px',
  },
  settingsTabLabel: {
    padding: '0px 20px',
  },
};

/* eslint-disable react/prefer-stateless-function */
class Form extends React.Component {

  constructor(props) {
    super(props);
    this.processSelectedPopoverFilters = this.processSelectedPopoverFilters.bind(this);
  }

  state = {
    openModal: false
  };

  handleOpen = () => {
    this.setState({
      openModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      openModal: false,
    });
  };

  processSelectedPopoverFilters() {
    const dropDownValuePicked = this.props.dialoguePageFilterCategory;
    const chipValuesPickedG1 = this.props.dialoguePageFilterActions;
    const textFilterValue = this.props.dialoguePageFilterSearchSaying;
    const chipValuesPickedG2 = this.props.dialoguePageFilterKeywords;
    const issuesChipValuePickedG1 = this.props.dialoguePageFilterActionIssues;
    const issuesChipValuePickedG2 = this.props.dialoguePageFilterKeywordIssues;


    var filter = '';
    if (textFilterValue != '') {
      filter = filter + textFilterValue + ' ';
    }
    if (dropDownValuePicked != 'Pick Category' && dropDownValuePicked != '') {
      filter = filter + 'category:"' + dropDownValuePicked + '"';
    }
    if (chipValuesPickedG1.length > 0) {
      filter = filter + ' actions:"'
      filter = filter + chipValuesPickedG1.join('" actions:"')
      filter = filter + '"';
    }

    if (chipValuesPickedG2.length > 0) {
      filter = filter + ' keywords:"'
      filter = filter + chipValuesPickedG2.join('" keywords:"')
      filter = filter + '"';
    }

    if (issuesChipValuePickedG1) {
      filter = filter + ' actionIssues:"'
      filter = filter + ['true'].join('" actionIssues:"')
      filter = filter + '"';
    }

    if (issuesChipValuePickedG2) {
      filter = filter + ' keywordIssues:"'
      filter = filter + ['true'].join('" keywordIssues:"')
      filter = filter + '"';
    }
    this.props.onChangeDialoguePageFilterString(filter);
    this.props.onSearchSaying(true);
  }

  render() {
    const { classes, intl, isReadOnly } = this.props;
    return (
      <Grid className={classes.headerContainer} container item xs={12}>
        <Grid className={classes.titleContainer} item xs={12}>
          <img className={classes.agentIcon} src={agentIcon} />
          <Grid className={classes.titleTextHelpContainer} container>
            <Typography className={classes.title} variant="h2">
              <FormattedMessage {...messages.title} />
            </Typography>
            <Button
              className={classes.helpButton}
              variant="outlined"
              onClick={this.handleOpen}
            >
              <img
                className={classes.playIcon}
                src={playHelpIcon}
                alt={intl.formatMessage(messages.playHelpAlt)}
              />
              <span className={classes.helpText}>
                <FormattedMessage {...messages.help} />
              </span>
            </Button>
            <Modal open={this.state.openModal} onClose={this.handleClose}>
              <Grid className={classes.modalContent} container>
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    this.props.selectedTab === 'sayings'
                      ? 'https://www.youtube.com/embed/opL04qS6S5U'
                      : 'https://www.youtube.com/embed/-Agogt68gSg'
                  }
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </Grid>
            </Modal>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} container direction={'row'}>
            <Grid item xs={6}>
              <Tabs
                className={classes.agentTabs}
                value={this.props.selectedTab}
                indicatorColor="primary"
                textColor="secondary"
                scrollable
                scrollButtons="off"
                onChange={(evt, value) => {
                  this.props.handleTabChange(evt, value);
                }}
                TabIndicatorProps={{
                  style: {
                    display: 'none',
                  },
                }}
              >
                <Tab
                  value="sayings"
                  label={
                    <span className={classes.tabLabel}>
                      <span>{intl.formatMessage(messages.sayingsFormTitle)}</span>
                    </span>
                  }
                  className={
                    this.props.selectedTab === 'sayings' ? classes.selected : null
                  }
                />
                <Tab
                  value="keywords"
                  label={
                    <span className={classes.tabLabel}>
                      <span>{intl.formatMessage(messages.keywordsFormTitle)}</span>
                    </span>
                  }
                  className={
                    this.props.selectedTab === 'keywords' ? classes.selected : null
                  }
                />
                <Tab
                  value="actions"
                  label={
                    <span className={classes.tabLabel}>
                      <span>{intl.formatMessage(messages.actionsFormTitle)}</span>
                    </span>
                  }
                  className={
                    this.props.selectedTab === 'actions' ? classes.selected : null
                  }
                />
              </Tabs>
            </Grid>
            <Grid item xs={6} style={{ justifyContent: 'flex-end' }} container direction={'row'}>
              {this.props.selectedTab === 'sayings' && (
                <PopoverFilter
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  showCheckboxFilter={false}
                  showTextFilter={true}
                  showDropDownFilter={true}
                  showMinMaxFilter={false}
                  showChipsG1={true}
                  showMinMaxFilter={false}
                  showCustomFirstChipG1={false}
                  dropDownValues={map(this.props.agentCategories, 'categoryName')}
                  chipValuesG1={map(this.props.agentActions, 'actionName')}
                  textFilterPlaceholder={intl.formatMessage(messages.searchSayingPlaceholder)}
                  dropDownMainOptionLabel={intl.formatMessage(messages.pickCategory)}
                  chipsFilterLabelG1={intl.formatMessage(messages.pickActions)}
                  dropDownFilterLabel={intl.formatMessage(messages.pickCategoryLabel)}
                  filtersDescription={intl.formatMessage(messages.filtersDescription)}
                  processSelectedFilters={this.processSelectedPopoverFilters}
                  onChangeCurrentTextFilterValue={this.props.onChangeDialoguePageFilterSearchSaying}
                  textFilterValue={this.props.dialoguePageFilterSearchSaying}
                  onChangeDropDownValuePicked={this.props.onChangeDialoguePageFilterCategory}
                  dropDownValuePicked={this.props.dialoguePageFilterCategory}
                  onChangeChipValuesPickedG1={this.props.onChangeDialoguePageFilterActions}
                  chipValuesPickedG1={this.props.dialoguePageFilterActions}
                  onChangeNumberFiltersApplied={this.props.onChangeDialoguePageNumberOfFiltersApplied}
                  numberFiltersApplied={this.props.dialoguePageNumberOfFiltersApplied}
                  onResetFilters={this.props.onResetDialoguePageFilters}
                  showChipsG2={true}
                  showCustomFirstChipG2={false}
                  chipValuesG2={map(this.props.agentKeywords, 'keywordName')}
                  chipsFilterLabelG2={intl.formatMessage(messages.pickKeywords)}
                  onChangeChipValuesPickedG2={this.props.onChangeDialoguePageFilterKeywords}
                  chipValuesPickedG2={this.props.dialoguePageFilterKeywords}
                  showIssuesChipG1={true}
                  onChangeIssuesChipValuesPickedG1={this.props.onChangeDialoguePageFilterActionIssues}
                  issuesChipValuePickedG1={this.props.dialoguePageFilterActionIssues}
                  showIssuesChipG2={true}
                  onChangeIssuesChipValuesPickedG2={this.props.onChangeDialoguePageFilterKeywordIssues}
                  issuesChipValuePickedG2={this.props.dialoguePageFilterKeywordIssues}


                />
              )}
            </Grid>
          </Grid>
          {this.props.selectedTab === 'sayings' && (
            <SayingsDataForm
              isReadOnly={isReadOnly}
              agentId={this.props.agentId}
              sayings={this.props.sayings}
              sayingsPageSize={this.props.sayingsPageSize}
              agentKeywords={this.props.agentKeywords}
              agentActions={this.props.agentActions}
              agentCategories={this.props.agentCategories}
              agentFilteredCategories={this.props.agentFilteredCategories}
              agentFilteredActions={this.props.agentFilteredActions}
              onAddSaying={this.props.onAddSaying}
              onDeleteSaying={this.props.onDeleteSaying}
              onChangeSayingCategory={this.props.onChangeSayingCategory}
              onTagKeyword={this.props.onTagKeyword}
              onUntagKeyword={this.props.onUntagKeyword}
              onAddAction={this.props.onAddAction}
              onDeleteAction={this.props.onDeleteAction}
              onAddNewSayingAction={this.props.onAddNewSayingAction}
              onDeleteNewSayingAction={this.props.onDeleteNewSayingAction}
              onGoToUrl={this.props.onGoToUrl.bind(
                null,
                this.props.selectedTab,
              )}
              onSendSayingToAction={this.props.onSendSayingToAction}
              currentSayingsPage={this.props.currentSayingsPage}
              numberOfSayingsPages={this.props.numberOfSayingsPages}
              changeSayingsPage={this.props.changeSayingsPage}
              moveSayingsPageBack={this.props.moveSayingsPageBack}
              moveSayingsPageForward={this.props.moveSayingsPageForward}
              changeSayingsPageSize={this.props.changeSayingsPageSize}
              onSelectCategory={this.props.onSelectCategory}
              category={this.props.category}
              userSays={this.props.userSays}
              onSearchCategory={this.props.onSearchCategory}
              onSearchActions={this.props.onSearchActions}
              newSayingActions={this.props.newSayingActions}
              onClearSayingToAction={this.props.onClearSayingToAction}
              onToggleConversationBar={this.props.onToggleConversationBar}
              onSendMessage={this.props.onSendMessage}
              trainTest={this.props.trainTest}
              onUpdateSayingData={this.props.onUpdateSayingData}
            />
          )}
          {this.props.selectedTab === 'keywords' && (
            <KeywordsDataForm
              isReadOnly={isReadOnly}
              agentId={this.props.agentId}
              keywords={this.props.agentKeywords}
              onCreateKeyword={this.props.onCreateKeyword}
              currentKeywordsPage={this.props.currentKeywordsPage}
              keywordsPageSize={this.props.keywordsPageSize}
              numberOfKeywordsPages={this.props.numberOfKeywordsPages}
              changeKeywordsPage={this.props.changeKeywordsPage}
              changeKeywordsPageSize={this.props.changeKeywordsPageSize}
              moveKeywordsPageBack={this.props.moveKeywordsPageBack}
              moveKeywordsPageForward={this.props.moveKeywordsPageForward}
              onGoToUrl={this.props.onGoToUrl.bind(
                null,
                this.props.selectedTab,
              )}
            />
          )}
          {this.props.selectedTab === 'actions' && (
            <ActionsDataForm
              isReadOnly={isReadOnly}
              agentId={this.props.agentId}
              actionsPage={this.props.actionsPage}
              onCreateAction={this.props.onCreateAction}
              currentActionsPage={this.props.currentActionsPage}
              actionsPageSize={this.props.actionsPageSize}
              numberOfActionsPages={this.props.numberOfActionsPages}
              changeActionsPage={this.props.changeActionsPage}
              changeActionsPageSize={this.props.changeActionsPageSize}
              moveActionsPageBack={this.props.moveActionsPageBack}
              moveActionsPageForward={this.props.moveActionsPageForward}
              onGoToUrl={this.props.onGoToUrl.bind(
                null,
                this.props.selectedTab,
              )}
              onDeleteTotalAction={this.props.onDeleteTotalAction}
            />
          )}
        </Grid>
      </Grid>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  sayings: PropTypes.array,
  agentId: PropTypes.string,
  sayingsPageSize: PropTypes.number,
  agentKeywords: PropTypes.array,
  agentActions: PropTypes.array,
  agentCategories: PropTypes.array,
  agentFilteredCategories: PropTypes.array,
  agentFilteredActions: PropTypes.array,
  onAddSaying: PropTypes.func,
  onDeleteSaying: PropTypes.func,
  onDeleteAction: PropTypes.func,
  onTagKeyword: PropTypes.func,
  onUntagKeyword: PropTypes.func,
  onSearchSaying: PropTypes.func,
  onSearchCategory: PropTypes.func,
  onSearchActions: PropTypes.func,
  onAddAction: PropTypes.func,
  onGoToUrl: PropTypes.func,
  onSendSayingToAction: PropTypes.func,
  currentSayingsPage: PropTypes.number,
  sayingsNumberOfPages: PropTypes.number,
  changeSayingsPage: PropTypes.func,
  moveSayingsPageBack: PropTypes.func,
  moveSayingsPageForward: PropTypes.func,
  changeSayingsPageSize: PropTypes.func,
  onSelectCategory: PropTypes.func,
  category: PropTypes.string,
  userSays: PropTypes.string,
  newSayingActions: PropTypes.array,
  onAddNewSayingAction: PropTypes.func,
  onDeleteNewSayingAction: PropTypes.func,
  onClearSayingToAction: PropTypes.func,
  filter: PropTypes.string,
  onSearchKeyword: PropTypes.func,
  onCreateKeyword: PropTypes.func,
  keywords: PropTypes.array,
  currentKeywordsPage: PropTypes.number,
  keywordsPageSize: PropTypes.number,
  numberKeywordsOfPages: PropTypes.number,
  changeKeywordsPage: PropTypes.func,
  changeKeywordsPageSize: PropTypes.func,
  moveKeywordsPageBack: PropTypes.func,
  moveKeywordsPageForward: PropTypes.func,
  selectedTab: PropTypes.string,
  handleTabChange: PropTypes.func,
  onChangeSayingCategory: PropTypes.func,
  isReadOnly: PropTypes.bool,
  onChangeDialoguePageFilterSearchSaying: PropTypes.func,
  dialoguePageFilterSearchSaying: PropTypes.string,
  onChangeDialoguePageFilterCategory: PropTypes.func,
  dialoguePageFilterCategory: PropTypes.string,
  onChangeDialoguePageFilterSearchSaying: PropTypes.func,
  dialoguePageFilterSearchSaying: PropTypes.string,
  onChangeDialoguePageFilterCategory: PropTypes.func,
  dialoguePageFilterCategory: PropTypes.string,
  onChangeDialoguePageFilterActions: PropTypes.func,
  dialoguePageFilterActions: PropTypes.array,
  onChangeDialoguePageNumberOfFiltersApplied: PropTypes.func,
  dialoguePageNumberOfFiltersApplied: PropTypes.number,
  onResetDialoguePageFilters: PropTypes.func,
  onChangeDialoguePageFilterKeywords: PropTypes.func,
  dialoguePageFilterKeywords: PropTypes.array,
  onChangeDialoguePageFilterKeywordIssues: PropTypes.func,
  dialoguePageFilterKeywordIssues: PropTypes.bool,
  onChangeDialoguePageFilterActionIssues: PropTypes.func,
  dialoguePageFilterActionIssues: PropTypes.bool,
  onToggleConversationBar: PropTypes.func,
  onSendMessage: PropTypes.func,
  trainTest: PropTypes.object,
  onUpdateSayingData: PropTypes.func
};

Form.defaultProps = {
  isReadOnly: false,
};


export default injectIntl(withStyles(styles)(Form));

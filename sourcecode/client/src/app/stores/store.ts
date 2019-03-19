import { combineReducers } from 'redux';
import * as auth from './auth';
import * as register from './register';
import * as reset from './reset';
import * as changePassword from './change-password';
import * as ideas from './idea';
import * as common from './common';
import * as discussionJoin from './discussion-join';
import * as discussionExit from './discussion-exit';
import * as rating from './rating';
import * as usermenu from './user-menu';
import * as trader from './trader';
import * as email from './email';
import * as advisor from './advisor';
import * as wallet from './wallet';
import * as get_discussion_user from './get_discussion_user';
import * as preferences from './preferences';

export interface IAppState {
  auth?: auth.IAuthStore,
  register?: register.IRegister
  reset?: reset.IReset
  changePassword?: changePassword.IChange_Password
  ideas?: ideas.IIdeaStore
  common?:common.ICommon
  discussionJoin?:discussionJoin.IDiscussionJoin
  rating?: rating.IRating
  usermenu?: usermenu.IUserMenu
  traderSubsribe?:trader.ITrader
  email?:email.IEmail
  advisor?:advisor.IAdvisorStore
  wallet?:wallet.IWallet,
  get_discussion_user?:get_discussion_user.IGetDiscussionUser
  preferences?: preferences.IPreferences
}

export const rootReducer = combineReducers<IAppState>({
  auth: auth.authReducer,
  register: register.regReducer,
  reset: reset.resetReducer,
  changePassword: changePassword.changePasswordReducer,
  ideas: ideas.ideaReducer,
  common:common.commonReducer,
  discussionJoin:discussionJoin.discussionjoinReducer,
  rating: rating.ratingReducer,
  usermenu:usermenu.userMenuReducer,
  traderSubsribe:trader.traderReducer,
  email:email.emailReducer,
  advisor:advisor.advisorReducer,
  wallet:wallet.walletReducer,
  get_discussion_user:get_discussion_user.getdiscussionReducer,
  preferences: preferences.preferenceReducer
});

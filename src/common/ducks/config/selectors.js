import {createSelector} from 'reselect'

const _getConfig = (state) => state.get('config')

export const getAuthorInfo = createSelector(_getConfig, config => config.get('AUTHOR_INFO'))

export const getHostUrl = createSelector(_getConfig, config => config.get('HOST_URL'))
export const getAPIServerUrl = createSelector(_getConfig, config => config.get('API_SERVER_URL'))

export const getSiteName = createSelector(_getConfig, config => config.get('SITE_NAME'))
export const getSiteMeta = createSelector(_getConfig, config => config.get('SITE_META'))
export const getSiteLink = createSelector(_getConfig, config => config.get('SITE_LINK'))

export const getPageSize = createSelector(_getConfig, config => config.get('PAGE_SIZE'))
export const getRecentArticleCount = createSelector(_getConfig, config => config.get('RECENT_ARTICLE_COUNT'))
export const getCommentConfig = createSelector(_getConfig, config => config.get('COMMENT_CONFIG'))

export const getMenuItems = createSelector(_getConfig, config => config.get('MENU_ITEMS'))

export const getSiteVersion = createSelector(_getConfig, config => config.get('SITE_VERSION'))
export const getSiteUpdatedTime = createSelector(_getConfig, config => config.get('SITE_UPDATED_TIME'))

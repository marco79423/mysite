import {createSelector} from 'reselect'

const _getConfig = (state) => state.config

export const getAuthorInfo = createSelector(_getConfig, config => config.AUTHOR_INFO)

export const getHostUrl = createSelector(_getConfig, config => config.HOST_URL)
export const getBackendServerUrl = createSelector(_getConfig, config => config.BACKEND_SERVER_URL)

export const getSiteName = createSelector(_getConfig, config => config.SITE_NAME)
export const getSiteMeta = createSelector(_getConfig, config => config.SITE_META)
export const getSiteLink = createSelector(_getConfig, config => config.SITE_LINK)
export const getCopyright = createSelector(_getConfig, config => config.COPYRIGHT)

export const getPageSize = createSelector(_getConfig, config => config.PAGE_SIZE)
export const getRecentArticleCount = createSelector(_getConfig, config => config.RECENT_ARTICLE_COUNT)
export const getCommentConfig = createSelector(_getConfig, config => config.COMMENT_CONFIG)

export const getMenuItems = createSelector(_getConfig, config => config.MENU_ITEMS)

export const getTheme = createSelector(_getConfig, config => config.theme)

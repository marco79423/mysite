import {createSelector} from 'reselect'

const _getConfig = (state) => state.get('config')

export const getSiteName = createSelector(_getConfig, config => config.get('SITE_NAME'))
export const getSiteMeta = createSelector(_getConfig, config => config.get('SITE_META'))

export const getPageSize = createSelector(_getConfig, config => config.get('PAGE_SIZE'))
export const getRecentArticleCount = createSelector(_getConfig, config => config.get('RECENT_ARTICLE_COUNT'))
export const getCommentConfig = createSelector(_getConfig, config => config.get('COMMENT_CONFIG'))
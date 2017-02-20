export const getSiteName = (state) => state.getIn(['config', 'SITE_NAME'])
export const getSiteMeta = (state) => state.getIn(['config', 'SITE_META'])

export const getPageSize = (state) => state.getIn(['config', 'PAGE_SIZE'])
export const getRecentArticleCount = (state) => state.getIn(['config', 'RECENT_ARTICLE_COUNT'])
export const getCommentConfig = (state) => state.getIn(['config', 'COMMENT_CONFIG'])

/* tslint:disable:no-unused-imports */
/* tslint:disable:no-unused-variable */
// Your module must at least include these three imports
import * as React from 'react'
import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import * as FontawesomeWidget from 'netlify-cms-widget-fontawesome'
CMS.registerWidget(
  'fontawesome',
  FontawesomeWidget.Solid,
  FontawesomeWidget.Preview,
)

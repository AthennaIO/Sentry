/**
 * @athenna/sentry
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Sentry from '@sentry/node'

import { debug } from '#src/debug'
import { Config } from '@athenna/config'
import { Path, File } from '@athenna/common'

let directories: { config?: string } = {}

const file = new File('.athennarc.json', '')
const pjson = await new File(Path.pwd('package.json')).getContentAsJson()

if (file.fileExists) {
  debug('loading directories from .athennarc.json file')
  directories = file.getContentAsJsonSync().directories || {}
} else {
  debug('loading directories from package.json file')
  directories = pjson.athenna?.directories || {}
}

if (directories.config) {
  debug('defining %s as config directory', directories.config)
  Path.setConfig(directories.config)
}

await Config.safeLoad(Path.config(`sentry.${Path.ext()}`))

if (Config.is('sentry.enabled', true)) {
  debug('starting sentry instrumentation')

  Sentry.init(Config.get('sentry.options'))
}

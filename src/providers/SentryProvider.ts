/**
 * @athenna/sentry
 *
 * (c) João Lenon <lenon@athenna.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Sentry from '@sentry/node'

import { Config } from '@athenna/config'
import { ServiceProvider } from '@athenna/ioc'

export class SentryProvider extends ServiceProvider {
  public async register() {
    if (Config.is('sentry.enabled', true)) {
      Sentry.init(Config.get('sentry.options', {}))
    }
  }
}

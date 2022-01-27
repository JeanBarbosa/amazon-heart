import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import View from '@ioc:Adonis/Core/View';
import User from 'App/Models/User';
import mjml from 'mjml';

interface UserMailData {
  user: User;
  to: string;
  subject: string;
  template: string;
  data?: any;
}

export default class UserEmail extends BaseMailer {
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()

  public html: string;
  private subject: string;
  private to: string;

  constructor({ user, to, subject, template, data }: UserMailData) {
    super()

    this.subject = subject
    this.to = to
    this.html = mjml(View.renderSync(template, { user, ...data })).html
  }

  /**
   * The prepare method is invoked automatically when you run
   * "UserEmail.send".
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
      .from('no-reply@exemple.com.br')
      .to(this.to)
      .subject(this.subject)
      .html(this.html)
  }
}

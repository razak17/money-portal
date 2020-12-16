import {MigrationInterface, QueryRunner} from "typeorm";

export class MockTransactions71608058739189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`

insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('fusce', 'credit', 1, '2020-04-10T02:33:39Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('metus', 'checking', 1, '2020-07-10T19:12:12Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('faucibus', 'savings', 1, '2020-01-13T15:33:47Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('congue', 'savings', 1, '2020-02-04T07:51:21Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('neque', 'credit', 1, '2020-02-29T07:56:53Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('tempus', 'savings', 1, '2020-03-13T16:48:14Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vulputate', 'checking', 1, '2020-04-08T14:35:41Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('pede', 'checking', 1, '2019-12-29T01:59:35Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('velit', 'credit', 1, '2020-03-27T16:23:31Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sapien', 'credit', 1, '2020-07-11T09:45:07Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('in', 'savings', 1, '2020-08-01T10:38:07Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('id', 'checking', 1, '2020-06-17T18:34:10Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('risus', 'checking', 1, '2020-05-11T20:14:22Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('rutrum', 'checking', 1, '2020-04-05T23:05:17Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('est', 'savings', 1, '2020-09-03T21:02:31Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('dolor', 'savings', 1, '2020-11-10T21:49:14Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('duis', 'credit', 1, '2020-07-14T11:07:17Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vitae', 'checking', 1, '2020-04-05T14:31:43Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('justo', 'savings', 1, '2020-05-30T23:48:38Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('massa', 'credit', 1, '2020-07-27T21:11:23Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nisl', 'savings', 1, '2020-10-03T03:31:44Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('quisque', 'savings', 1, '2020-09-07T00:21:40Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('felis', 'checking', 1, '2020-09-24T17:13:48Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nunc', 'checking', 1, '2020-06-12T19:52:39Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('cras', 'savings', 1, '2020-09-29T19:44:03Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('mi', 'credit', 1, '2020-04-24T12:14:31Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vestibulum', 'savings', 1, '2020-05-01T14:57:37Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vestibulum', 'checking', 1, '2020-01-11T19:37:30Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('diam', 'checking', 1, '2020-04-08T12:43:56Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('velit', 'checking', 1, '2020-10-14T19:07:40Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sapien', 'credit', 1, '2020-05-02T13:33:06Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('cursus', 'savings', 1, '2020-05-15T19:28:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('non', 'checking', 1, '2020-01-28T23:32:43Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('parturient', 'credit', 1, '2019-12-27T11:56:18Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('mi', 'checking', 1, '2020-02-02T05:03:19Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nunc', 'credit', 1, '2020-07-17T08:30:04Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('amet', 'credit', 1, '2020-01-26T01:10:15Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('porttitor', 'checking', 1, '2020-01-28T10:54:38Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('mauris', 'checking', 1, '2020-07-17T13:57:00Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lacus', 'credit', 1, '2020-11-05T02:18:01Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('in', 'savings', 1, '2020-01-25T01:49:19Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('rutrum', 'credit', 1, '2020-10-12T04:59:09Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sed', 'checking', 1, '2020-10-05T21:25:01Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('morbi', 'savings', 1, '2020-01-04T11:31:09Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nisi', 'credit', 1, '2020-07-26T02:59:37Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vel', 'checking', 1, '2020-06-22T12:37:47Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('semper', 'credit', 1, '2020-08-04T10:33:06Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ligula', 'checking', 1, '2020-05-02T14:49:22Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lacinia', 'checking', 1, '2020-04-04T23:53:16Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('curabitur', 'credit', 1, '2020-01-14T02:17:51Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('donec', 'savings', 1, '2020-04-18T22:11:29Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lacinia', 'credit', 1, '2020-06-06T07:47:55Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('velit', 'checking', 1, '2020-08-05T23:43:28Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('odio', 'savings', 1, '2020-11-18T00:49:12Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('quis', 'checking', 1, '2020-07-08T09:51:57Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('at', 'credit', 1, '2020-02-03T04:19:16Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('donec', 'savings', 1, '2020-06-28T09:37:14Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('dolor', 'savings', 1, '2020-06-24T20:22:20Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('at', 'credit', 1, '2020-09-28T06:07:25Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('eget', 'checking', 1, '2020-09-20T19:36:18Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('neque', 'savings', 1, '2020-12-04T03:34:02Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ac', 'savings', 1, '2020-11-03T12:50:55Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vel', 'savings', 1, '2020-06-29T22:14:18Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ac', 'credit', 1, '2020-03-12T00:45:54Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ante', 'credit', 1, '2020-08-17T03:55:18Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lorem', 'checking', 1, '2020-09-20T07:08:25Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('interdum', 'checking', 1, '2020-03-31T09:06:44Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('montes', 'savings', 1, '2020-03-17T16:19:04Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sit', 'credit', 1, '2020-06-20T01:53:45Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('et', 'checking', 1, '2020-10-23T03:08:35Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('semper', 'checking', 1, '2020-04-09T11:13:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lacinia', 'checking', 1, '2020-12-06T19:28:09Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('et', 'savings', 1, '2020-03-17T23:40:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('pede', 'savings', 1, '2019-12-19T07:33:58Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('justo', 'credit', 1, '2020-08-12T02:20:29Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('imperdiet', 'credit', 1, '2020-06-22T23:44:39Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ante', 'savings', 1, '2020-06-22T08:06:24Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('porttitor', 'checking', 1, '2020-06-28T07:52:45Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ultrices', 'credit', 1, '2020-08-10T15:35:28Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nulla', 'credit', 1, '2020-08-26T12:55:27Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('a', 'credit', 1, '2020-05-21T12:43:57Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('tincidunt', 'credit', 1, '2020-09-11T23:32:43Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('diam', 'savings', 1, '2020-10-05T11:57:09Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('congue', 'checking', 1, '2020-09-30T22:51:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nisi', 'checking', 1, '2020-08-20T05:09:21Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('orci', 'checking', 1, '2020-04-29T14:55:48Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ut', 'checking', 1, '2019-12-18T02:36:17Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('penatibus', 'checking', 1, '2020-06-12T15:00:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('orci', 'credit', 1, '2020-07-19T02:00:58Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sapien', 'credit', 1, '2020-09-08T03:50:26Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sed', 'checking', 1, '2020-04-29T01:22:02Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('libero', 'credit', 1, '2020-09-11T22:01:33Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('donec', 'credit', 1, '2020-11-09T06:36:51Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nisl', 'savings', 1, '2020-06-05T23:19:57Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ultrices', 'checking', 1, '2020-05-14T06:44:34Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ultrices', 'checking', 1, '2020-02-24T09:37:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vitae', 'savings', 1, '2019-12-18T20:27:03Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('amet', 'savings', 1, '2019-12-23T14:38:44Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('id', 'savings', 1, '2020-04-25T07:16:37Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nam', 'checking', 1, '2020-10-14T05:50:19Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nulla', 'savings', 1, '2020-05-13T23:06:00Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nec', 'checking', 1, '2020-02-05T18:37:03Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vel', 'checking', 1, '2020-04-14T14:47:01Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('fermentum', 'checking', 1, '2020-07-04T00:06:04Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('morbi', 'savings', 1, '2020-01-28T21:24:14Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('est', 'checking', 1, '2020-09-21T00:32:45Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lorem', 'checking', 1, '2020-09-24T09:10:57Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('pede', 'credit', 1, '2020-09-27T15:52:55Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('a', 'checking', 1, '2020-05-01T06:57:32Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('pede', 'checking', 1, '2020-06-22T07:44:35Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('mauris', 'credit', 1, '2020-07-02T23:50:49Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('hendrerit', 'credit', 1, '2020-03-23T13:33:17Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('tristique', 'credit', 1, '2020-11-26T16:47:23Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('pulvinar', 'savings', 1, '2020-01-27T13:56:50Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('duis', 'credit', 1, '2020-03-14T18:44:46Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nec', 'savings', 1, '2020-03-17T03:33:31Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nulla', 'savings', 1, '2020-06-03T17:02:15Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('et', 'checking', 1, '2020-03-13T16:25:24Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('luctus', 'checking', 1, '2020-04-25T16:07:25Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('curabitur', 'savings', 1, '2020-08-02T04:18:27Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('leo', 'checking', 1, '2020-02-16T21:28:12Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('adipiscing', 'checking', 1, '2020-03-19T01:10:53Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('feugiat', 'checking', 1, '2020-01-02T10:28:53Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('adipiscing', 'savings', 1, '2020-03-16T05:22:42Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('tincidunt', 'checking', 1, '2020-11-03T17:46:58Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('orci', 'savings', 1, '2020-09-14T04:52:37Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('diam', 'credit', 1, '2020-03-26T15:57:33Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('est', 'credit', 1, '2020-03-27T09:53:13Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('libero', 'checking', 1, '2019-12-27T03:33:19Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vestibulum', 'credit', 1, '2020-09-02T11:22:14Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lectus', 'savings', 1, '2020-06-28T19:32:53Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('leo', 'credit', 1, '2020-11-29T22:00:47Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ante', 'checking', 1, '2020-07-28T14:02:46Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('molestie', 'credit', 1, '2020-05-26T14:50:05Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('quam', 'checking', 1, '2020-09-26T02:35:25Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('aliquam', 'savings', 1, '2020-05-10T16:47:32Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('porta', 'savings', 1, '2020-05-10T07:48:15Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vitae', 'credit', 1, '2020-09-06T08:49:44Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ante', 'checking', 1, '2020-11-27T12:19:53Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('neque', 'savings', 1, '2020-08-31T06:31:00Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('eu', 'checking', 1, '2020-09-23T03:40:46Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('donec', 'credit', 1, '2020-06-19T20:48:40Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('dapibus', 'credit', 1, '2020-04-04T06:39:41Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('non', 'savings', 1, '2020-02-21T02:33:27Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('proin', 'credit', 1, '2020-06-01T11:00:57Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('venenatis', 'credit', 1, '2020-12-06T05:49:51Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('tellus', 'checking', 1, '2019-12-29T07:28:43Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('a', 'checking', 1, '2019-12-20T07:45:27Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('semper', 'credit', 1, '2020-09-17T11:02:01Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sit', 'credit', 1, '2020-10-11T00:08:33Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('convallis', 'checking', 1, '2020-08-23T07:48:58Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sociis', 'credit', 1, '2020-01-12T18:58:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ipsum', 'savings', 1, '2020-02-14T17:09:42Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('fusce', 'credit', 1, '2020-08-30T14:22:03Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sed', 'savings', 1, '2019-12-16T16:56:42Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('eu', 'checking', 1, '2020-10-09T17:41:46Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sed', 'credit', 1, '2019-12-23T06:32:03Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('aliquet', 'checking', 1, '2020-11-20T22:26:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nulla', 'savings', 1, '2020-06-17T23:22:04Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lacus', 'savings', 1, '2020-11-03T19:45:05Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('parturient', 'credit', 1, '2020-11-03T22:19:11Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('amet', 'checking', 1, '2020-02-09T03:35:50Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('id', 'savings', 1, '2020-05-24T02:24:12Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('in', 'checking', 1, '2020-09-23T05:09:22Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('id', 'credit', 1, '2020-05-10T11:54:09Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('curabitur', 'credit', 1, '2020-06-28T22:44:31Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nam', 'savings', 1, '2020-03-16T11:45:35Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('a', 'savings', 1, '2020-05-23T13:33:35Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('id', 'savings', 1, '2020-02-12T03:35:45Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('non', 'checking', 1, '2020-04-02T15:43:54Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('mauris', 'credit', 1, '2020-01-29T19:42:16Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nisi', 'checking', 1, '2020-06-22T09:30:41Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sem', 'savings', 1, '2020-04-12T18:08:07Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('elit', 'savings', 1, '2020-11-24T10:31:56Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vel', 'savings', 1, '2020-01-25T01:47:48Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('mauris', 'checking', 1, '2020-08-10T20:47:26Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('tortor', 'credit', 1, '2020-08-25T10:44:56Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('hac', 'savings', 1, '2020-06-04T18:59:08Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('erat', 'savings', 1, '2020-10-11T20:00:49Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nulla', 'credit', 1, '2020-11-03T17:28:27Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ante', 'checking', 1, '2020-06-02T11:40:10Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('cubilia', 'savings', 1, '2020-06-14T11:19:57Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ullamcorper', 'savings', 1, '2020-09-19T13:06:56Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('in', 'savings', 1, '2020-09-09T08:15:39Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nulla', 'credit', 1, '2020-11-06T11:46:53Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ultrices', 'checking', 1, '2020-05-02T17:38:32Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('nisl', 'checking', 1, '2020-05-03T00:44:16Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('faucibus', 'savings', 1, '2020-06-26T08:11:12Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('sapien', 'credit', 1, '2020-03-14T06:49:49Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('curabitur', 'credit', 1, '2020-06-24T00:00:06Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('rutrum', 'savings', 1, '2020-08-21T12:40:13Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('lacus', 'credit', 1, '2020-05-10T12:34:04Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('dui', 'savings', 1, '2019-12-28T21:14:43Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('ornare', 'savings', 1, '2020-10-12T13:24:23Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('massa', 'credit', 1, '2020-04-06T05:53:17Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('libero', 'checking', 1, '2020-11-14T00:11:35Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('vel', 'savings', 1, '2020-07-17T16:32:57Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('dui', 'savings', 1, '2020-01-10T06:44:03Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('quis', 'credit', 1, '2020-06-14T05:14:36Z', 999, 99);
insert into bank_account (name, type, "creatorId", "createdAt", "startingBalance", "lowBalanceAlert") values ('congue', 'credit', 1, '2020-02-07T09:43:19Z', 999, 99);

      `)
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
